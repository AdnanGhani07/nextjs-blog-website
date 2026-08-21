'use client';

import { useEffect, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
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
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full" />
      </div>
    );
  }

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-16">
        <h1 className="text-xl font-cinzel text-muted-foreground">Admin privileges required to view users.</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-destructive text-lg font-cinzel">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto p-4 md:p-8">
      {users === null ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full" />
        </div>
      ) : users.length > 0 ? (
        <div className="rounded-3xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-cinzel text-xs uppercase">Joined</TableHead>
                <TableHead className="font-cinzel text-xs uppercase">Avatar</TableHead>
                <TableHead className="font-cinzel text-xs uppercase">Username</TableHead>
                <TableHead className="font-cinzel text-xs uppercase">Email</TableHead>
                <TableHead className="font-cinzel text-xs uppercase text-center">Admin Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-serif text-xs text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={u.profilePicture} alt={u.username} className="object-cover" />
                      <AvatarFallback>{u.username?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-serif font-semibold">{u.username}</TableCell>
                  <TableCell className="text-muted-foreground font-serif text-xs">
                    {Array.isArray(u.email) ? u.email.join(', ') : (u.email || 'N/A')}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      {u.isAdmin ? (
                        <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-full border border-emerald-500/20">
                          <FiCheck className="h-3.5 w-3.5" />
                        </div>
                      ) : (
                        <div className="bg-muted text-muted-foreground p-1.5 rounded-full border border-border/60">
                          <FiX className="h-3.5 w-3.5" />
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
        <div className="text-center py-16">
          <p className="font-serif italic text-muted-foreground text-lg">No authors recorded yet.</p>
        </div>
      )}
    </div>
  );
}