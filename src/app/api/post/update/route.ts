import Post from '@/lib/models/post.model';
import { connect } from '@/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
  const user = await currentUser();
  try {
    const data = await req.json();

    if (
      !user ||
      user.publicMetadata.userMongoId !== data.userMongoId ||
      user.publicMetadata.isAdmin !== true
    ) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    await connect();

    const newPost = await Post.findByIdAndUpdate(
      data.postId,
      {
        $set: {
          title: data.title,
          content: data.content,
          category: data.category,
          image: data.image,
        },
      },
      { new: true }
    );

    if (!newPost) {
      return new NextResponse('Post not found', {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(newPost), {
      status: 200,
    });
  } catch (error) {
    console.log('Error updating post:', error);
    return new NextResponse('Error updating post', {
      status: 500,
    });
  }
};