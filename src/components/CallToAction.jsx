import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border  dark:border-indigo-500 border-indigo-100 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center bg-transparent shadow-lg'>
      <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl font-semibold dark:text-white text-black'>
          Love Poetry, Stories, or Journals?
        </h2>
        <p className='my-2 dark:text-white text-black'>
          Explore a curated collection of thought-provoking poems, introspective journals, and heartfelt stories from writers across the world.
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none mt-2 dark:text-white text-black'>
          <a href="https://www.poetryarchive.org" target='_blank' rel='noopener noreferrer'>
            Discover Literary Treasures
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1050&q=80"
          alt="Open book with poem"
          className="rounded-md shadow-md"
        />
      </div>
    </div>
  );
}
