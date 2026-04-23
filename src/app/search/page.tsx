'use client';

import { useEffect, useState, Suspense } from 'react';
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
import { GiScrollUnfurled, GiMagnifyingGlass } from 'react-icons/gi';

function SearchContent() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'all',
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
        category: categoryFromUrl || 'all',
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
          category: (categoryFromUrl === 'all' || !categoryFromUrl) ? '' : categoryFromUrl,
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
        category: sidebarData.category === 'all' ? '' : sidebarData.category,
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
    <div className='flex flex-col md:flex-row min-h-screen relative'>
      <div className="absolute inset-0 bg-[#2c1e16]/5 pointer-events-none" />
      
      <aside className='w-full md:w-80 p-8 border-b-4 md:border-b-0 md:border-r-4 border-double border-[#d3a625]/30 relative z-10'>
        <div className="mb-8 flex items-center gap-3 border-b-2 border-[#d3a625]/20 pb-4">
           <GiMagnifyingGlass className="h-6 w-6 text-[#740001]" />
           <h2 className="font-cinzel text-xl font-bold text-[#2c1e16]">Filter Archives</h2>
        </div>

        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='space-y-3'>
            <Label htmlFor='searchTerm' className='font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#2c1e16]/60'>
              Search Query
            </Label>
            <Input
              placeholder='Keywords...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={(e) => setSidebarData({ ...sidebarData, searchTerm: e.target.value })}
              className='bg-white/50 border-b-2 border-t-0 border-x-0 border-[#d3a625]/30 rounded-none focus-visible:ring-0 focus-visible:border-[#740001] font-serif italic'
            />
          </div>

          <div className='space-y-3'>
            <Label htmlFor='sort' className='font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#2c1e16]/60'>
              Chronology
            </Label>
            <Select 
              value={sidebarData.sort}
              onValueChange={(value) => setSidebarData({ ...sidebarData, sort: value })}
            >
              <SelectTrigger id='sort' className='bg-white/50 border-b-2 border-t-0 border-x-0 border-[#d3a625]/30 rounded-none focus:ring-0'>
                <SelectValue placeholder='Select order' />
              </SelectTrigger>
              <SelectContent className="bg-[#f4e4bc] border-[#d3a625]/30">
                <SelectItem value='desc'>Newest Dispatches</SelectItem>
                <SelectItem value='asc'>Ancient Scrolls</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-3'>
            <Label htmlFor='category' className='font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#2c1e16]/60'>
              Thematic Circle
            </Label>
            <Select 
              value={sidebarData.category}
              onValueChange={(value) => setSidebarData({ ...sidebarData, category: value })}
            >
              <SelectTrigger id='category' className='bg-white/50 border-b-2 border-t-0 border-x-0 border-[#d3a625]/30 rounded-none focus:ring-0'>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent className="bg-[#f4e4bc] border-[#d3a625]/30">
                <SelectItem value='all'>All Scrolls</SelectItem>
                <SelectItem value='uncategorized'>Uncategorized</SelectItem>
                <SelectItem value='poem'>Poetry & Verses</SelectItem>
                <SelectItem value='journal'>Personal Journals</SelectItem>
                <SelectItem value='article'>Library Articles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type='submit' size='lg' className='w-full font-cinzel font-bold tracking-widest bg-[#740001] hover:bg-[#2c1e16] text-white shadow-lg transition-all rounded-none h-12'>
            Examine the Tomes
          </Button>
        </form>
      </aside>

      <main className='flex-1 p-8 relative z-10'>
        <div className="mb-12 border-b-2 border-[#d3a625]/20 pb-6 flex justify-between items-end">
           <h1 className='font-cinzel text-4xl font-bold tracking-tighter text-[#2c1e16]'>
             Recovered Scrolls
           </h1>
           <div className="text-[#2c1e16]/40 font-serif italic text-sm">
             Showing results from the deep archives
           </div>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10'>
          {!loading && posts.length === 0 && (
            <div className='col-span-full text-center py-32'>
              <GiScrollUnfurled className="h-16 w-16 text-[#d3a625]/20 mx-auto mb-4" />
              <p className='font-serif text-2xl italic text-[#2c1e16]/40'>Alas, no scrolls match your search criteria.</p>
            </div>
          )}
          {loading && (
             <div className='col-span-full text-center py-32'>
               <div className="animate-spin h-12 w-12 border-4 border-[#740001]/20 border-t-[#740001] rounded-full mx-auto mb-4" />
               <p className='font-serif text-2xl animate-pulse text-[#2c1e16]/40 italic'>Unrolling the heavy parchments...</p>
             </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
        
        {showMore && (
          <div className='mt-20 text-center'>
            <Button
              variant='ghost'
              size='lg'
              onClick={handleShowMore}
              className='font-cinzel font-bold tracking-[0.3em] text-[#740001] hover:bg-[#740001]/5 border-2 border-transparent hover:border-[#740001]/20 px-12 h-14'
            >
              Discover More Fragments
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={
      <div className='flex items-center justify-center min-h-screen'>
        <div className="animate-spin h-12 w-12 border-4 border-[#740001]/20 border-t-[#740001] rounded-full" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}