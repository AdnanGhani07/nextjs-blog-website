'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FiAlertTriangle, FiEdit, FiTrash2 } from 'react-icons/fi';
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
  const { user, isLoaded } = useUser();
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
    if (isLoaded && user?.publicMetadata?.isAdmin) {
      fetchPosts();
    }
  }, [isLoaded, user?.publicMetadata?.isAdmin, user?.publicMetadata?.userMongoId]);

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
        const errorText = await res.text().catch(() => 'Unknown error');
        try {
          const data = JSON.parse(errorText);
          console.error('Delete failed:', data.message || errorText);
        } catch {
          console.error('Delete failed:', errorText);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full" />
      </div>
    );
  }

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-16">
        <h1 className="text-xl font-cinzel text-muted-foreground">Admin privileges required to manage posts.</h1>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto p-4 md:p-8">
      {userPosts.length > 0 ? (
        <div className="rounded-3xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-cinzel text-xs uppercase">Updated</TableHead>
                <TableHead className="font-cinzel text-xs uppercase">Preview</TableHead>
                <TableHead className="font-cinzel text-xs uppercase">Title</TableHead>
                <TableHead className="font-cinzel text-xs uppercase">Circle</TableHead>
                <TableHead className="font-cinzel text-xs uppercase text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPosts.map((post) => (
                <TableRow key={post._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-serif text-xs text-muted-foreground">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/post/${post.slug}`}>
                      <div className="relative w-14 h-10 overflow-hidden rounded-xl border border-border bg-muted">
                        <Image
                          src={post.image || "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=300&q=80"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="font-cinzel font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                      href={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-[11px] font-cinzel font-bold uppercase">
                      {post.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/dashboard/update-post/${post._id}`}>
                        <Button variant="ghost" size="sm" className="rounded-full h-8 px-3 text-xs font-cinzel gap-1 text-primary hover:bg-primary/10">
                          <FiEdit className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full h-8 px-3 text-xs font-cinzel gap-1 text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                      >
                        <FiTrash2 className="h-3 w-3" />
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
        <div className="text-center py-16">
          <p className="font-serif italic text-muted-foreground text-lg">No posts penned yet.</p>
        </div>
      )}

      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 font-cinzel text-lg">
              <FiAlertTriangle className="h-5 w-5 text-destructive" />
              Delete Manuscript?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-serif text-sm">
              This action cannot be undone. This piece will be permanently removed from the archives.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full font-cinzel text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePost}
              className="rounded-full font-cinzel text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Piece
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
