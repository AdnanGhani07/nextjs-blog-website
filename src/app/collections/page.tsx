import CallToAction from '@/components/CallToAction';

export default function Collections() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-serif font-semibold'>Collections</h1>
      <p className='text-md text-gray-600 dark:text-gray-200 text-center leading-relaxed'>
        Explore curated series of poems, prose, and journal entries—each collection a 
        journey through emotions, seasons, and stories woven with words.
      </p>
      <CallToAction />
    </div>
  );
}
