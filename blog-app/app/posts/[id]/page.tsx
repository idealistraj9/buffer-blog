'use client';
// pages/posts/[id].js
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.message);
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
    <div className="flex flex-col overflow-auto h-[750px] p-10 text-primary bg-secondary rounded-lg">
      <div className="flex flex-col h-full overflow-auto space-y-4">
        <h1 className="font-bold text-3xl text-center pb-5">{post.title}</h1>
        <img src={post.img} alt="Post Image" className="w-[100%]  h-full object-cover mx-auto " />
        <p className="text-lg">{post.content}</p>
        <p className="text-sm font-medium">Author: {post.username}</p>
      </div>
    </div>
  );
};

export default Post;
