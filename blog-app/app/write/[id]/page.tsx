'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface Post {
  title: string;
  img: string;
  content: string;
  username: string;
  desc?: string;
}

interface EditPostProps {
  params: {
    id: string;
  };
}

const EditPost = ({ params }: EditPostProps) => {
  const { id } = params;
  const { user } = useUser();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          if (data.authorId!== user.id) {
            setError('You do not have permission to edit this post');
          } else {
            setPost(data);
          }
          setLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            console.error('An unexpected error occurred:', error);
            setError('An unexpected error occurred');
          }
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post) {
      console.error('Post is null');
      return;
    }
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

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <div className="w-full mx-auto my-20">
      <h1 className="text-4xl font-semibold mb-8">Edit Post</h1>
      {error && <p className="text-red-600 mb-6">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="font-semibold text-xl block text-secondary">Title:</label>
          <input
            id="title"
            value={post?.title || ''}
            onChange={(e) => setPost({...post!, title: e.target.value })}
            className="p-5 bg-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="content" className="font-semibold text-xl block text-secondary">Content:</label>
          <textarea
            id="content"
            value={post?.content || ''}
            onChange={(e) => setPost({...post!, content: e.target.value })}
            rows={10}
            className="p-5 bg-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="username" className="font-semibold text-xl block text-secondary">Username:</label>
          <input
            id="username"
            value={post?.username || ''}
            readOnly
            className="p-5 bg-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="img" className="font-semibold text-xl block text-secondary">Image URL:</label>
          <input
            id="img"
            value={post?.img || ''}
            onChange={(e) => setPost({...post!, img: e.target.value })}
            className="p-5 bg-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="desc" className="font-semibold text-xl block text-secondary">Description:</label>
          <textarea
            id="desc"
            value={post?.desc || ''}
            onChange={(e) => setPost({...post!, desc: e.target.value })}
            className="p-5 bg-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
