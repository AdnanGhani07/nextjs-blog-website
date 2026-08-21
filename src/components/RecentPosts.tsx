import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import PostCard from "./PostCard";
import { FiBookOpen } from "react-icons/fi";

interface RecentPostsProps {
  limit: number;
}

export default async function RecentPosts({ limit }: RecentPostsProps) {
  let posts: any[] | null = null;
  try {
    await connect();
    posts = await Post.find().sort({ updatedAt: -1 }).limit(limit).lean();
  } catch (error) {
    console.error("Error getting recent posts:", error);
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {posts && posts.length > 0 ? (
          posts.map((post: any) => <PostCard key={post._id.toString()} post={post} />)
        ) : (
          <div className="col-span-full py-16 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground">
              <FiBookOpen className="h-6 w-6" />
            </div>
            <p className="font-serif italic text-lg text-muted-foreground">
              No entries found in the journal yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
