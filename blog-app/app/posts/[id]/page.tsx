'use client';
// pages/posts/[id].tsx
import React from 'react';
import { useParams } from 'next/navigation';// Adjust the import path accordingly
import Post from '@/components/post';


const PostPage = () => {
  
  const { id } = useParams();

  return (
    <>
      <Post id={id as string} />
    </>

  );
};

export default PostPage;
