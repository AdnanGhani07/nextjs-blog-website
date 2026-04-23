import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PostCard({ post }: { post: any }) {
  return (
    <Card className='group relative w-full h-[400px] overflow-hidden rounded-xl sm:w-[430px] border-2 transition-all hover:border-primary/50'>
      <Link href={`/post/${post.slug}`} className='block overflow-hidden relative h-[260px]'>
        <Image
          src={post.image}
          alt='post cover'
          fill
          className='object-cover transition-all duration-300 group-hover:scale-110'
        />
      </Link>
      
      <CardHeader className='p-4 pb-2'>
        <p className='text-xl font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors'>
          {post.title}
        </p>
      </CardHeader>
      
      <CardContent className='p-4 pt-0'>
        <span className='inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground'>
          {post.category}
        </span>
      </CardContent>

      <CardFooter className='p-4 absolute bottom-[-100px] left-0 right-0 transition-all duration-300 group-hover:bottom-0 bg-background/80 backdrop-blur-sm border-t'>
        <Link href={`/post/${post.slug}`} className='w-full'>
          <Button variant='default' className='w-full font-semibold'>
            Read Article
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}