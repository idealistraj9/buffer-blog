import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

// Define a type for the params object
type ParamsType = { userId: string };

export const GET = async (request: any, { params: { userId } }: { params: ParamsType }) => {
  try {
    await connect();
    const posts = await Post.find({ authorId: userId });
    if (!posts.length) { // Check if posts array is empty
      return new NextResponse('No posts found', { status: 404 });
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
};
