'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

interface Post {
  _id: string;
  title: string;
  img: string;
  content: string;
  username: string;
  desc: string;
}

const UserBlogs = () => {
  const [post, setPost] = useState<Array<Post> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`/api/posts/user/${userId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch user posts');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(`An unknown error occurred: ${error}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 p-10 md:px-20 text-black overflow-auto h-full">
      {Array.isArray(post) && post.length > 0 ? (
        post.map((post) => (
          <div className='w-full h-full'>
            <Link className=""
              href={`/posts/${post._id}`} passHref key={post._id}>
              <div className="bg-primary rounded-xl shadow-md overflow-hidden w-full ">
                <div className="relative">
                  <img className="w-full h-48 object-cover" src={post.img} />
                </div>
                <div className="flex flex-col p-4 h-[200px] font-bold ">
                  <div className="text-lg  mb-2">{post.title}<br /></div>
                  <p className=" text-sm animate-pulse	">{post.desc} </p>
                </div>
              </div>
            </Link>

            <button
              onClick={() => handleDelete(post._id)}
              className="ml-2 pb-2 bg-secondary text-sm m-5 text-white px-2 py-1 rounded "
            >
              Delete
            </button>
          </div>

        ))
      ) : (
        <div className="col-span-full text-center py-4">No posts found</div>
      )}

    </div>
  );

  async function handleDelete(id: any) {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      setPost((prevPosts) => {
        if (prevPosts === null) {
          return [];
        } else {
          return prevPosts.filter(p => p._id !== id);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`An unknown error occurred: ${error}`);
      }
    }
  }



};

export default UserBlogs;
