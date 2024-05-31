'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Post {
  title: string;
  img: string;
  content: string;
  username: string;
}

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          // Fallback for non-Error cases, e.g., network errors
          setError(`An unknown error occurred: ${error}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen bg-red-200 text-red-800">{error}</div>;
  if (!post) return <div className="flex justify-center items-center h-screen">No post found</div>;

  return (
    <div className='h-[90%] shadow-lg overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-corner-rounded-full scrollbar-track-rounded-full scrollbar-thumb-background scrollbar-track-primary'>
      <div className="flex flex-col  p-20 text-secondary bg-primary rounded-lg ">
        <div className="flex flex-col h-full space-y-4">
          <h1 className="font-bold text-3xl sm:text-xl text-center pb-5">{post.title}</h1>
          <img src={post.img} alt="Post Image" className="w-[100%]  h-full object-cover mx-auto " />
          <p className="text-lg">{post.content}</p>
          <p className="text-sm font-medium">Author: {post.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
