'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const EditPost = ({ params }) => {
  const { id } = params;
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id && user) {
      const fetchPost = async () => {
        try {
          const res = await fetch(`/api/posts/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch post');
          }
          const data = await res.json();
          console.log(data.authorId, user.id);
          if (data.authorId !== user.id) {
            setError('You do not have permission to edit this post');
          } else {
            setPost(data);
          }
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: post.title,
      content: post.content,
      username: post.username,
      img: post.img,
      desc: post.desc,
    };

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push('/');
      } else {
        console.error('Error updating post:', res);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={post.username}
            onChange={(e) => setPost({ ...post, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="img">Image URL:</label>
          <input
            type="text"
            id="img"
            value={post.img}
            onChange={(e) => setPost({ ...post, img: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            value={post.desc}
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
