'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

const UserBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`/api/posts/user/${userId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch user posts');
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>My Blogs</h1>
      <ul>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <li key={post._id}>
              <Link href={`/write/${post._id}`}>{post.title}</Link>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No posts found</li>
        )}
      </ul>
    </>
  );

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      setError(error.message);
    }
  }
};

export default UserBlogs;
