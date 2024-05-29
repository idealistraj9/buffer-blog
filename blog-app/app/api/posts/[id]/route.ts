// api/posts/[id].ts
import Post from "@/models/Post";
import connect from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (request, { params: { id } }) => {
  try {
    await connect();
    const post = await Post.findById(id);
    if (!post) {
      return new NextResponse('Post not found', { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  
  // Debug auth function
  let userId;
  try {
    const authResult = auth();
    userId = authResult.userId;
    console.log("Authenticated userId:", userId);
  } catch (error) {
    console.error("Error with auth function:", error);
    return new NextResponse("Authentication Error", { status: 500 });
  }

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { title, content, username, img, desc } = await request.json();
    await connect();

    const post = await Post.findById(id);

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (post.authorId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    post.title = title;
    post.content = content;
    post.username = username;
    post.img = img;
    post.desc = desc;

    await post.save();

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};