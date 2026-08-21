'use client';

import { useEffect, useState } from 'react';
import {
  FiTrendingUp,
  FiFileText,
  FiUsers,
  FiArrowRight,
} from 'react-icons/fi';
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
      <div className="flex flex-col items-center justify-center h-full w-full py-16">
        <h1 className="text-xl font-cinzel text-muted-foreground italic">
          The records are restricted to authorized administrators only.
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="rounded-3xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:border-primary/40">
          <CardContent className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-cinzel font-bold uppercase tracking-wider text-muted-foreground">Total Writers & Users</p>
                <h3 className="font-cinzel text-4xl font-bold text-foreground mt-2">{totalUsers}</h3>
              </div>
              <div className="bg-primary/10 text-primary p-3.5 rounded-2xl border border-primary/20">
                <FiUsers className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 text-xs font-serif">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                <FiTrendingUp className="mr-1 h-3.5 w-3.5" />
                +{lastMonthUsers}
              </span>
              <span className="text-muted-foreground">Joined in the last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:border-primary/40">
          <CardContent className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-cinzel font-bold uppercase tracking-wider text-muted-foreground">Total Published Works</p>
                <h3 className="font-cinzel text-4xl font-bold text-foreground mt-2">{totalPosts}</h3>
              </div>
              <div className="bg-secondary/10 text-secondary p-3.5 rounded-2xl border border-secondary/20">
                <FiFileText className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 text-xs font-serif">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                <FiTrendingUp className="mr-1 h-3.5 w-3.5" />
                +{lastMonthPosts}
              </span>
              <span className="text-muted-foreground">Authored in the last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-3xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 border-b border-border/50 bg-muted/20">
            <CardTitle className="font-cinzel text-base font-bold text-foreground">Recent Users</CardTitle>
            <Link href="/dashboard?tab=users">
              <Button variant="ghost" size="sm" className="font-cinzel text-xs font-bold text-primary gap-1">
                View All <FiArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow>
                  <TableHead className="font-cinzel text-xs uppercase w-[80px]">Avatar</TableHead>
                  <TableHead className="font-cinzel text-xs uppercase">Username</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.map((u) => (
                  <TableRow key={u._id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={u.profilePicture} alt={u.username} className="object-cover" />
                        <AvatarFallback>{u.username?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-serif font-medium">{u.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 border-b border-border/50 bg-muted/20">
            <CardTitle className="font-cinzel text-base font-bold text-foreground">Recent Pieces</CardTitle>
            <Link href="/dashboard?tab=posts">
              <Button variant="ghost" size="sm" className="font-cinzel text-xs font-bold text-primary gap-1">
                View All <FiArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow>
                  <TableHead className="font-cinzel text-xs uppercase">Preview</TableHead>
                  <TableHead className="font-cinzel text-xs uppercase">Title</TableHead>
                  <TableHead className="font-cinzel text-xs uppercase">Circle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts && posts.map((post) => (
                  <TableRow key={post._id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="relative w-12 h-9 overflow-hidden rounded-lg border border-border bg-muted">
                        <Image
                          src={post.image || "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=300&q=80"}
                          alt="post"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-serif font-medium max-w-[200px] truncate">{post.title}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-[11px] font-cinzel font-bold uppercase">
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