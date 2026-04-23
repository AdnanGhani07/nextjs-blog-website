import Post from '@/lib/models/post.model';
import { connect } from '@/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized: No user logged in' }, { status: 401 });
    }

    const data = await req.json();

    if (user.publicMetadata.userMongoId !== data.userMongoId || user.publicMetadata.isAdmin !== true) {
      return NextResponse.json({ message: 'Unauthorized: User does not have permission' }, { status: 401 });
    }

    const { title, content, image, category } = data;
    if (!title || !content) {
      return NextResponse.json({ message: 'Missing required fields: title and content are required.' }, { status: 400 });
    }

    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = await Post.create({
      userId: user.publicMetadata.userMongoId,
      content,
      title,
      image,
      category,
      slug,
    });

    return NextResponse.json(newPost, { status: 201 });

  } catch (error: any) {
    console.error('Error creating post:', error);

    return NextResponse.json(
      { message: 'Error creating post', error: error.message },
      { status: 500 }
    );
  }
};