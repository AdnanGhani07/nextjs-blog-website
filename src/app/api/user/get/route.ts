import User from '@/lib/models/user.model';
import { connect } from '@/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (user.publicMetadata.isAdmin !== true) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    await connect();
    const data = await req.json();

    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.sort === 'asc' ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return new NextResponse(JSON.stringify({ users, totalUsers, lastMonthUsers }), {
      status: 200,
    });
  } catch (error) {
    console.log('Error getting the users :', error);
    return new NextResponse('Error getting the users', { status: 500 });
  }
};