'use client';

import { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function DashUsers() {
  const { user, isLoaded } = useUser();
  const [users, setUsers] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Failed to fetch users');
        }

        const data = await res.json();
        setUsers(data.users);
      } catch (error: any) {
        console.error('Error fetching users:', error.message);
        setError(error.message);
        setUsers([]);
      }
    };
    if (user?.publicMetadata?.isAdmin) {
      fetchUsers();
    }
  }, [user?.publicMetadata?.isAdmin]);

  if (!isLoaded) {
    return (
      <div className='flex items-center justify-center min-h-[400px] w-full'>
        <div className="animate-spin h-8 w-8 border-4 border-[#740001]/20 border-t-[#740001] rounded-full" />
      </div>
    );
  }

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full py-12'>
        <h1 className='text-2xl font-bold text-muted-foreground'>You are not an admin!</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-destructive text-lg font-bold'>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='w-full overflow-x-auto p-4 md:mx-auto'>
      {users === null ? (
        <div className='flex items-center justify-center py-12'>
          <div className="animate-spin h-8 w-8 border-4 border-[#740001]/20 border-t-[#740001] rounded-full" />
        </div>
      ) : users.length > 0 ? (
        <div className='rounded-md border bg-card shadow-sm'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date created</TableHead>
                <TableHead>User image</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className='text-center'>Admin Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id} className='hover:bg-muted/50 transition-colors'>
                  <TableCell className='font-medium'>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Avatar className='h-10 w-10 border'>
                      <AvatarImage src={u.profilePicture} alt={u.username} className='object-cover' />
                      <AvatarFallback>{u.username?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className='font-semibold'>{u.username}</TableCell>
                  <TableCell className='text-muted-foreground'>{u.email}</TableCell>
                  <TableCell className='text-center'>
                    <div className='flex justify-center'>
                      {u.isAdmin ? (
                        <div className='bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full'>
                          <FaCheck className='text-green-600 dark:text-green-400 h-4 w-4' />
                        </div>
                      ) : (
                        <div className='bg-red-100 dark:bg-red-900/30 p-1.5 rounded-full'>
                          <FaTimes className='text-red-600 dark:text-red-400 h-4 w-4' />
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-muted-foreground text-lg'>You have no users yet!</p>
        </div>
      )}
    </div>
  );
}