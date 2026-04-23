import Post from '@/lib/models/post.model';
import { connect } from '@/lib/mongodb/mongoose';
import PostCard from './PostCard';

interface RecentPostsProps {
  limit: number;
}

export default async function RecentPosts({ limit }: RecentPostsProps) {
  let posts: any[] | null = null;
  try {
    await connect();
    // Fetch directly from DB
    posts = await Post.find()
      .sort({ updatedAt: -1 })
      .limit(limit);
  } catch (error) {
    console.log('Error getting post:', error);
  }
  return (
    <div className='flex flex-col justify-center items-center mb-5'>
      <h1 className='text-xl mt-5 text-teal-800 dark:text-teal-300 font-semibold'>Recent Articles</h1>
      <div className='flex flex-wrap gap-5 mt-5 justify-center'>
        {posts && posts.map((post: any) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}