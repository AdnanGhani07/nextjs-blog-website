import Link from 'next/link';
import CallToAction from '@/components/CallToAction';
import RecentPosts from '@/components/RecentPosts';

export default async function Home() {
  let posts = null;
  try {
    const result = await fetch(`${process.env.URL}/api/post/get`, {
      method: 'POST',
      body: JSON.stringify({ limit: 9, order: 'desc' }),
      cache: 'no-store',
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log('Error fetching posts:', error);
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-6 py-20 px-4 max-w-4xl text-center'>
        <h1 className='text-4xl font-serif font-bold text-gray-800 dark:text-gray-200 lg:text-6xl'>
          Where Words Find Their Home
        </h1>
        <p className='text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-relaxed'>
          Immerse yourself in thoughtful musings, heartfelt poems, and quiet reflections.
          This is a sanctuary for storytellers, journal keepers, and seekers of rhythm and meaning —
          lovingly built with Next.js and{' '}
          <a
            href='https://go.clerk.com/fgJHKlt'
            className='dark:text-teal-300 text-teal-800 hover:underline'
            target='_blank'
          >
            Clerk
          </a>
          .
        </p>
        <Link
          href='/search'
          className='text-sm dark:text-teal-300 text-teal-800 font-semibold hover:underline'
        >
          Browse The Archive
        </Link>
      </div>

      <div className='w-full bg-pink-50 dark:bg-gray-800 p-6 rounded-xl shadow-md'>
        <CallToAction />
      </div>

      <div className='p-6 flex flex-col gap-8 py-10 w-full max-w-5xl'>
        <RecentPosts limit={9} />
        <Link
          href='/search?category=null'
          className='text-md dark:text-teal-300 text-teal-800 hover:underline text-center'
        >
          See All Writings
        </Link>
      </div>
    </div>
  );
}
