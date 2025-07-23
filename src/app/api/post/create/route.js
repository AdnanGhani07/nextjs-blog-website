import Post from '../../../../lib/models/post.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'; // Use NextResponse for cleaner responses

export const POST = async (req) => {
  try {
    await connect();
    const user = await currentUser();

    // --- FIX 1: Improved Authorization Check ---
    // First, check if the user exists to prevent TypeErrors.
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized: No user logged in' }, { status: 401 });
    }

    const data = await req.json();

    // Now, perform the rest of the authorization checks.
    // This logic assumes ONLY an admin can post.
    if (user.publicMetadata.userMongoId !== data.userMongoId || user.publicMetadata.isAdmin !== true) {
      return NextResponse.json({ message: 'Unauthorized: User does not have permission' }, { status: 401 });
    }

    // --- FIX 2: Input Validation ---
    // Ensure required fields are present before using them.
    const { title, content, image, category } = data;
    if (!title || !content) {
      return NextResponse.json({ message: 'Missing required fields: title and content are required.' }, { status: 400 }); // 400 Bad Request
    }

    // --- Slug Generation (safe now because we validated `title` exists) ---
    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    // --- FIX 3: Correct Mongoose Usage ---
    // Use `Post.create()` and do NOT call `.save()` after.
    const newPost = await Post.create({
      userId: user.publicMetadata.userMongoId,
      content,
      title,
      image, // This can be null/undefined if not provided
      category, // This can be null/undefined if not provided
      slug,
    });

    // Use NextResponse for a standard JSON response.
    return NextResponse.json(newPost, { status: 201 }); // 201 Created is more appropriate

  } catch (error) {
    // Log the full error for better debugging on the server
    console.error('Error creating post:', error);

    // Provide a more informative error response
    return NextResponse.json(
      { message: 'Error creating post', error: error.message },
      { status: 500 }
    );
  }
};