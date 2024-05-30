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
          console.log(data.authorId, user.id);
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
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
