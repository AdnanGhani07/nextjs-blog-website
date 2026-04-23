import CallToAction from '@/components/CallToAction';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RecentPosts from '@/components/RecentPosts';
import Post from '@/lib/models/post.model';
import { connect } from '@/lib/mongodb/mongoose';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;
  let post: any = null;
  try {
    await connect();
    post = await Post.findOne({ slug });
  } catch (error) {
    console.log('Error fetching post:', error);
    post = { title: 'Failed to load post' };
  }
  
  if (!post || post.title === 'Failed to load post') {
    return (
      <main className='p-6 flex flex-col max-w-4xl mx-auto min-h-screen text-center'>
        <h2 className='text-3xl mt-20 font-serif font-bold'>
          Post not found
        </h2>
        <Link href="/" className="mt-6">
          <Button variant="outline">Return Home</Button>
        </Link>
      </main>
    );
  }
  
  return (
    <main className='p-6 flex flex-col max-w-4xl mx-auto min-h-screen'>
      <div className="space-y-6 text-center">
        <h1 className='text-4xl md:text-5xl lg:text-6xl mt-10 font-serif font-bold leading-tight'>
          {post.title}
        </h1>
        
        <Link
          href={`/search?category=${post.category}`}
          className='inline-block'
        >
          <Button variant="secondary" size="sm" className="rounded-full px-4">
            {post.category}
          </Button>
        </Link>
      </div>

      <div className="relative mt-12 rounded-2xl overflow-hidden shadow-2xl border aspect-video">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className='object-cover transition-transform duration-700 hover:scale-105'
        />
      </div>

      <div className='flex justify-between items-center py-6 mt-8 border-t border-b text-sm text-muted-foreground'>
        <div className="flex items-center gap-2">
          <span className="font-medium text-primary">Published</span>
          <span>{new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
        </div>
        <div className="flex items-center gap-2 italic">
          <span>{Math.ceil(post?.content?.length / 1000)} min read</span>
        </div>
      </div>

      <article 
        className='py-12 prose prose-lg dark:prose-invert max-w-none post-content leading-relaxed'
        dangerouslySetInnerHTML={{ __html: post?.content }}
      />

      <Separator className="my-12" />

      <div className='w-full'>
        <CallToAction />
      </div>

      <Separator className="my-12" />
      
      <RecentPosts limit={3} />
    </main>
  );
}