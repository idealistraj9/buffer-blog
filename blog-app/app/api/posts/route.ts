
import Post from "@/models/Post";
import connect from "@/utils/db";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

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

export const GET = async () => {
  try {
    await connect();

    const posts = await Post.find();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const POST = async (request:any) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { title, content, username, img, desc } = body;

    // Ensure all required fields are present
    if (!title || !content || !username || !img || !desc) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    await connect();

    const newPost = new Post({
      title,
      content,
      username,
      img,
      desc,
      authorId: userId,  // Set authorId to the current user's ID
    });

    await newPost.save();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
};
