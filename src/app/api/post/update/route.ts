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
      return NextResponse.json({ message: 'Unauthorized' }, {
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
      return NextResponse.json({ message: 'Post not found' }, {
        status: 404,
      });
    }

    return NextResponse.json(newPost, {
      status: 200,
    });
  } catch (error) {
    console.log('Error updating post:', error);
    return NextResponse.json({ message: 'Error updating post' }, {
      status: 500,
    });
  }
};