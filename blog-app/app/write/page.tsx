'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [posts, setPosts] = useState([]);
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
        setPosts(data);
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
      <h1>Blog Posts</h1>
      <ul>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <li key={post._id}>
              <Link href={`/write/${post._id}`}>
                {post.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No posts found</li>
        )}
      </ul>
      {/* <Link href="/write/new">
        Create New Post
      </Link> */}
    </>
  );
};

export default Home;
