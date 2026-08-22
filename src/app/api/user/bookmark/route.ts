import { connect } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    await connect();
    const dbUser = await User.findOne({ clerkId: user.id });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookmarks = dbUser.bookmarks || [];
    const isBookmarked = bookmarks.includes(postId);

    let updatedBookmarks: string[];
    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter((id: string) => id !== postId);
    } else {
      updatedBookmarks = [...bookmarks, postId];
    }

    dbUser.bookmarks = updatedBookmarks;
    await dbUser.save();

    return NextResponse.json({
      bookmarked: !isBookmarked,
      bookmarks: updatedBookmarks,
    });
  } catch (error: any) {
    console.error("Bookmark error:", error);
    return NextResponse.json({ error: "Failed to update bookmark" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ bookmarks: [] });
    }

    await connect();
    const dbUser = await User.findOne({ clerkId: user.id });
    return NextResponse.json({ bookmarks: dbUser?.bookmarks || [] });
  } catch (error: any) {
    return NextResponse.json({ bookmarks: [] });
  }
}
