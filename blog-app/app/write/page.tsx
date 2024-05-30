'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";

interface Post {
  title: string;
  img: string;
  content: string;
  username: string;
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
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
        {Array.isArray(post) && post.length > 0 ? (
          post.map((post) => (
            <Link href={`/posts/${post._id}`} passHref key={post._id} className=' h-[70%] m-0 p-0'>
              <Card shadow="sm" isPressable className="m-1 w-[100%] h-[100%] ">
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={post.title}
                    className="w-full object-cover h-[140px]"
                    src={post.img}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{post.title}</b>
                  {/* <p className="text-default-500">{post.desc || "No description available"}</p> */}
                </CardFooter>
              </Card>
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
