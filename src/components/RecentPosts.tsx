import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import PostCard from "./PostCard";

interface RecentPostsProps {
  limit: number;
}

export default async function RecentPosts({ limit }: RecentPostsProps) {
  let posts: any[] | null = null;
  try {
    await connect();
    // Fetch directly from DB
    posts = await Post.find().sort({ updatedAt: -1 }).limit(limit).lean();
  } catch (error) {
    console.log("Error getting post:", error);
  }
  return (
    <div className="w-full mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {posts?.length ? (
          posts.map((post: any) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="col-span-full text-center font-serif italic text-lg">No scrolls found in the archives...</p>
        )}
      </div>
    </div>
  );

}
