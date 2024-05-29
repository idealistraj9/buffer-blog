import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request:any, { params: { userId } }) => {
  try {
    await connect();
    const posts = await Post.find({ authorId: userId });
    if (!posts) {
      return new NextResponse('No posts found', { status: 404 });
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
};
