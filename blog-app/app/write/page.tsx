'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";

interface Post {
  title: string;
  img: string;
  content: string;
  username: string;
  desc: string;
}

const Home = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        console.log('Fetched posts:', data);
        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 p-10 md:px-20 text-black">
        {Array.isArray(post) && post.length > 0 ? (
          post.map((post) => (
            <Link className=""
              href={`/posts/${post._id}`} passHref key={post._id}>
              <div className="bg-primary rounded-xl shadow-md overflow-hidden w-full h-full ">
                <div className="relative">
                  <img className="w-full h-48 object-cover" src={post.img} />
                  {/* <div className="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md">New
                  </div> */}
                  {/* <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">3 min read
                  </div> */}
                </div>
                <div className="flex flex-col p-4 h-[200px] hover:h-[100%] hover:transition-h duration-500 ease-in-out font-bold ">
                  <div className="text-lg  mb-2">{post.title}</div>
                  <p className=" text-sm animate-pulse	">{post.desc} </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-4">No posts found</div>
        )}

      </div>

    </>
  );
};

export default Home;



