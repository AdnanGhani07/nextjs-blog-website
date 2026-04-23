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
    <div className="flex flex-col justify-center items-center mb-5">
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {posts?.length ? (
          posts.map((post: any) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}
