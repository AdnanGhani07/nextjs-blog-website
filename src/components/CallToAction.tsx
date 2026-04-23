import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function CallToAction() {
  return (
    <Card className='overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background to-secondary/20'>
      <CardContent className='p-8 flex flex-col md:flex-row gap-8 items-center'>
        <div className='flex-1 space-y-4 text-center md:text-left'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Love Poetry, Stories, or Journals?
          </h2>
          <p className='text-muted-foreground leading-relaxed'>
            Explore a curated collection of thought-provoking poems, introspective journals, 
            and heartfelt stories from writers across the world. Immerse yourself in the art of words.
          </p>
          <div className='pt-4'>
            <a 
              href="https://www.poetryarchive.org" 
              target='_blank' 
              rel='noopener noreferrer'
            >
              <Button size='lg' className='font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity'>
                Discover Literary Treasures
              </Button>
            </a>
          </div>
        </div>
        
        <div className='flex-1 w-full'>
          <div className='relative group aspect-video overflow-hidden rounded-lg'>
            <div className='absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200'></div>
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1050&q=80"
              alt="Open book with poem"
              fill
              className="relative rounded-lg shadow-2xl object-cover transition-transform group-hover:scale-105 duration-700"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
