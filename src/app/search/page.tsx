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
import { FiSearch, FiFilter, FiBookOpen } from 'react-icons/fi';

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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-80 p-8 border-b md:border-b-0 md:border-r border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="mb-8 flex items-center gap-2.5 border-b border-border/50 pb-4">
          <FiFilter className="h-5 w-5 text-primary" />
          <h2 className="font-cinzel text-lg font-bold text-foreground">Filter Archives</h2>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="searchTerm" className="font-cinzel text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Keywords
            </Label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search titles & prose..."
                id="searchTerm"
                type="text"
                value={sidebarData.searchTerm}
                onChange={(e) => setSidebarData({ ...sidebarData, searchTerm: e.target.value })}
                className="pl-9 bg-background/80 border-border/70 rounded-xl text-sm font-serif"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort" className="font-cinzel text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Order
            </Label>
            <Select 
              value={sidebarData.sort}
              onValueChange={(value) => setSidebarData({ ...sidebarData, sort: value })}
            >
              <SelectTrigger id="sort" className="bg-background/80 border-border/70 rounded-xl">
                <SelectValue placeholder="Select chronology" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Latest Dispatches</SelectItem>
                <SelectItem value="asc">Earliest Works</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="font-cinzel text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Genre / Circle
            </Label>
            <Select 
              value={sidebarData.category}
              onValueChange={(value) => setSidebarData({ ...sidebarData, category: value })}
            >
              <SelectTrigger id="category" className="bg-background/80 border-border/70 rounded-xl">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="uncategorized">Uncategorized</SelectItem>
                <SelectItem value="poem">Poetry & Verse</SelectItem>
                <SelectItem value="journal">Personal Journal</SelectItem>
                <SelectItem value="article">Library Article</SelectItem>
                <SelectItem value="ai">AI Reflection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full font-cinzel text-xs font-bold tracking-wider rounded-xl bg-primary text-primary-foreground hover:opacity-90 h-11 mt-2 shadow-sm"
          >
            Apply Filters
          </Button>
        </form>
      </aside>

      {/* Main Results Grid */}
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-10 border-b border-border/50 pb-4 flex justify-between items-end">
          <div>
            <h1 className="font-cinzel text-3xl font-bold tracking-tight text-foreground">
              Archived Pieces
            </h1>
            <p className="text-muted-foreground font-serif text-sm mt-1">
              Showing matching entries from the archives
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {!loading && posts.length === 0 && (
            <div className="col-span-full text-center py-24 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground">
                <FiBookOpen className="h-6 w-6" />
              </div>
              <p className="font-serif text-xl italic text-muted-foreground">
                No matching scrolls found in the archives.
              </p>
            </div>
          )}

          {loading && (
            <div className="col-span-full text-center py-24 flex flex-col items-center gap-3">
              <div className="animate-spin h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full" />
              <p className="font-serif text-lg text-muted-foreground italic animate-pulse">
                Retrieving scrolls...
              </p>
            </div>
          )}

          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id.toString()} post={post} />)}
        </div>
        
        {showMore && (
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleShowMore}
              className="font-cinzel text-xs font-bold tracking-widest rounded-full px-10 h-12 border-border/80 hover:bg-muted"
            >
              Load More Pieces
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}