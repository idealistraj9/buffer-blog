'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TracingBeam } from '@/components/tracing-beam';
// Adjust the import path as needed
import Image from 'next/image';
import { MacbookScroll } from './macbook-scroll';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await res.json();
                setPost(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>No post found</div>;

    return (
        <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                <MacbookScroll
                    src={post.img}
                    showGradient={true}
                    title={post.title}
                    badge={post.content}
                >
                    <div className="mb-10">
                        <p>{post.content}</p>
                        <div className="text-sm prose prose-sm dark:prose-invert">
                            {post.img && (
                                <Image
                                    src={post.img}
                                    alt={post.title}
                                    height="1000"
                                    width="1000"
                                    className="rounded-lg mb-10 object-cover"
                                />
                            )}
                            <p><strong>Username:</strong> {post.username}</p>
                            <p><strong>Description:</strong> {post.desc}</p>
                        </div>
                    </div>
                </MacbookScroll>
            </div>
        </TracingBeam>
    );
};

export default Post;
