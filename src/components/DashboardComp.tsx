'use client';

import { useEffect, useState } from 'react';
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

export default function DashboardComp() {
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: 5,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: 5,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (user?.publicMetadata?.isAdmin) {
      fetchUsers();
      fetchPosts();
    }
  }, [user]);

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full py-12'>
        <h1 className='text-2xl font-bold text-muted-foreground font-serif italic'>
          The records of state are restricted to authorized scribes only.
        </h1>
      </div>
    );
  }

  return (
    <div className='p-6 md:mx-auto space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-center max-w-5xl mx-auto'>
        <Card className='shadow-sm border-2 transition-all hover:border-primary/20'>
          <CardContent className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>Total Users</p>
                <h3 className='text-3xl font-bold mt-1'>{totalUsers}</h3>
              </div>
              <div className='bg-indigo-500/10 p-3 rounded-full'>
                <HiOutlineUserGroup className='text-indigo-600 h-8 w-8' />
              </div>
            </div>
            <div className='flex items-center gap-2 mt-4 text-sm'>
              <span className='text-green-600 font-semibold flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full'>
                <HiArrowNarrowUp className='mr-1' />
                {lastMonthUsers}
              </span>
              <span className='text-muted-foreground'>Since last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-sm border-2 transition-all hover:border-primary/20'>
          <CardContent className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>Total Posts</p>
                <h3 className='text-3xl font-bold mt-1'>{totalPosts}</h3>
              </div>
              <div className='bg-emerald-500/10 p-3 rounded-full'>
                <HiDocumentText className='text-emerald-600 h-8 w-8' />
              </div>
            </div>
            <div className='flex items-center gap-2 mt-4 text-sm'>
              <span className='text-green-600 font-semibold flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full'>
                <HiArrowNarrowUp className='mr-1' />
                {lastMonthPosts}
              </span>
              <span className='text-muted-foreground'>Since last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto'>
        <Card className='shadow-md overflow-hidden'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-muted/30'>
            <CardTitle className='text-lg font-bold'>Recent Users</CardTitle>
            <Link href={'/dashboard?tab=users'}>
              <Button variant='outline' size='sm' className='font-semibold'>
                See All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className='p-0'>
            <Table>
              <TableHeader className='bg-muted/20'>
                <TableRow>
                  <TableHead className='w-[100px]'>Avatar</TableHead>
                  <TableHead>Username</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.map((u) => (
                  <TableRow key={u._id} className='hover:bg-muted/50 transition-colors'>
                    <TableCell>
                      <Avatar className='h-10 w-10 border'>
                        <AvatarImage src={u.profilePicture} alt={u.username} className='object-cover' />
                        <AvatarFallback>{u.username?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className='font-medium'>{u.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className='shadow-md overflow-hidden'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-muted/30'>
            <CardTitle className='text-lg font-bold'>Recent Posts</CardTitle>
            <Link href={'/dashboard?tab=posts'}>
              <Button variant='outline' size='sm' className='font-semibold'>
                See All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className='p-0'>
            <Table>
              <TableHeader className='bg-muted/20'>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts && posts.map((post) => (
                  <TableRow key={post._id} className='hover:bg-muted/50 transition-colors'>
                    <TableCell>
                      <div className="relative w-14 h-10 overflow-hidden rounded-md border bg-muted">
                        <Image
                          src={post.image}
                          alt='post'
                          fill
                          className='object-cover'
                        />
                      </div>
                    </TableCell>
                    <TableCell className='font-medium max-w-[200px] truncate'>{post.title}</TableCell>
                    <TableCell>
                      <span className='inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold'>
                        {post.category}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}