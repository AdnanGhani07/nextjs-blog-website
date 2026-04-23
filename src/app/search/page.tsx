'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch('/api/post/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit: 9,
          order: sortFromUrl || 'desc',
          category: categoryFromUrl || 'uncategorized',
          searchTerm: searchTermFromUrl || '',
        }),
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const res = await fetch('/api/post/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 9,
        order: sidebarData.sort,
        category: sidebarData.category,
        searchTerm: sidebarData.searchTerm,
        startIndex,
      }),
    });
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <aside className='w-full md:w-80 p-8 border-b md:border-r bg-muted/20'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='space-y-3'>
            <Label htmlFor='searchTerm' className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
              Search Term
            </Label>
            <Input
              placeholder='Search posts...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={(e) => setSidebarData({ ...sidebarData, searchTerm: e.target.value })}
              className='bg-background'
            />
          </div>

          <div className='space-y-3'>
            <Label htmlFor='sort' className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
              Sort By
            </Label>
            <Select 
              value={sidebarData.sort}
              onValueChange={(value) => setSidebarData({ ...sidebarData, sort: value })}
            >
              <SelectTrigger id='sort' className='bg-background'>
                <SelectValue placeholder='Select order' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='desc'>Latest</SelectItem>
                <SelectItem value='asc'>Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-3'>
            <Label htmlFor='category' className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
              Category
            </Label>
            <Select 
              value={sidebarData.category}
              onValueChange={(value) => setSidebarData({ ...sidebarData, category: value })}
            >
              <SelectTrigger id='category' className='bg-background'>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='uncategorized'>Uncategorized</SelectItem>
                <SelectItem value='poem'>Poem</SelectItem>
                <SelectItem value='journal'>Journal</SelectItem>
                <SelectItem value='article'>Article</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type='submit' size='lg' className='w-full font-bold shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity'>
            Apply Filters
          </Button>
        </form>
      </aside>

      <main className='flex-1 p-8'>
        <h1 className='text-3xl font-bold border-b pb-6 mb-8'>
          Search Results
        </h1>
        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6'>
          {!loading && posts.length === 0 && (
            <div className='col-span-full text-center py-20'>
              <p className='text-2xl text-muted-foreground'>No posts found matching your criteria.</p>
            </div>
          )}
          {loading && (
             <div className='col-span-full text-center py-20'>
               <p className='text-2xl animate-pulse text-muted-foreground'>Searching the archive...</p>
             </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
        
        {showMore && (
          <div className='mt-12 text-center'>
            <Button
              variant='ghost'
              size='lg'
              onClick={handleShowMore}
              className='text-primary hover:text-primary/80 font-bold px-12'
            >
              Load More Writings
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}