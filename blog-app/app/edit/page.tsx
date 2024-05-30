// pages/edit-post/[id].tsx
'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`).then(res => {
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setImageUrl(post.imageUrl);
      });
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/posts/${id}`, { title, content, imageUrl });
      // Redirect or show success message
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!isSignedIn) return <div>Please sign in to edit this post.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <button type="submit">Update Post</button>
    </form>
  );
}
