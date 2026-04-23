import Post from '@/lib/models/post.model';
import { connect } from '@/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    
    if (!user || !user.publicMetadata.isAdmin || user.publicMetadata.userMongoId !== data.userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    await Post.findByIdAndDelete(data.postId);
    return new NextResponse('Post deleted', { status: 200 });
  } catch (error) {
    console.log('Error deleting post:', error);
    return new NextResponse('Error deleting post', { status: 500 });
  }
};