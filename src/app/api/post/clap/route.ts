import { connect } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    await connect();
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { claps: 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ claps: updatedPost.claps || 0 });
  } catch (error: any) {
    console.error("Clap error:", error);
    return NextResponse.json({ error: "Failed to clap" }, { status: 500 });
  }
}
