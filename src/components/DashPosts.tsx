'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function DashPosts() {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?.publicMetadata?.userMongoId,
          }),
        });
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    if (user?.publicMetadata?.isAdmin) {
      fetchPosts();
    }
  }, [user?.publicMetadata?.isAdmin, user?.publicMetadata?.userMongoId]);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postIdToDelete,
          userId: user?.publicMetadata?.userMongoId,
        }),
      });
      
      if (res.ok) {
        const newPosts = userPosts.filter(
          (post) => post._id !== postIdToDelete
        );
        setUserPosts(newPosts);
        setPostIdToDelete('');
      } else {
        const data = await res.json();
        console.log(data.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full py-12'>
        <h1 className='text-2xl font-bold text-muted-foreground'>You are not an admin!</h1>
      </div>
    );
  }

  return (
    <div className='w-full overflow-x-auto p-4 md:mx-auto'>
      {userPosts.length > 0 ? (
        <div className='rounded-md border bg-card shadow-sm'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date updated</TableHead>
                <TableHead>Post image</TableHead>
                <TableHead>Post title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className='text-center'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPosts.map((post) => (
                <TableRow key={post._id} className='hover:bg-muted/50 transition-colors'>
                  <TableCell className='font-medium'>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/post/${post.slug}`}>
                      <div className="relative w-16 h-10 overflow-hidden rounded-md border bg-muted">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='font-semibold text-primary hover:underline line-clamp-1'
                      href={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className='inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold'>
                      {post.category}
                    </span>
                  </TableCell>
                  <TableCell className='text-center'>
                    <div className='flex items-center justify-center gap-3'>
                      <Link href={`/dashboard/update-post/${post._id}`}>
                        <Button variant='outline' size='sm' className='text-teal-600 border-teal-200 hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-950/30'>
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant='outline' 
                        size='sm' 
                        className='text-destructive border-destructive/20 hover:bg-destructive/10'
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-muted-foreground text-lg'>You have no posts yet!</p>
        </div>
      )}

      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-center gap-2'>
              <HiOutlineExclamationCircle className='h-6 w-6 text-destructive' />
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the post
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePost}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
