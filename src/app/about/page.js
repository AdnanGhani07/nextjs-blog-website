export default function About() {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-2xl mx-auto p-3 text-center'>
          <div>
            <h1 className='text-3xl font-serif font-semibold text-center my-7'>
              About Adnan’s Blog
            </h1>
            <div className='text-md text-gray-600 dark:text-gray-200 flex flex-col gap-6 leading-relaxed'>
              <p>
                Welcome to <strong>Adnan’s Blog</strong> — a quiet corner of the internet
                where words meet emotion. This space is dedicated to sharing poems, prose,
                reflections, and fragments of thought, curated and penned by Adnan Ghani.
              </p>
  
              <p>
                Whether you're a lover of metaphors or someone seeking solace in verses,
                this blog offers a blend of personal musings and literary inspirations.
                Here, every post is a window into a moment, a feeling, or a memory.
              </p>
  
              <p>
                Built using <a
                  href='https://nextjs.org'
                  target='_blank'
                  className='text-teal-600 hover:underline dark:text-teal-300 dark:hover:text-teal-200'
                >
                  Next.js
                </a>{' '}
                and authenticated through{' '}
                <a
                  href='https://clerk.dev'
                  target='_blank'
                  className='text-teal-600 hover:underline dark:text-teal-300 dark:hover:text-teal-200'
                >
                  Clerk
                </a>
                , this blog is a modern home for timeless expression.
              </p>
  
              <p>
                Readers are encouraged to leave their thoughts in the comments, share favorite
                lines, or simply read quietly. This blog isn’t just a blog — it’s an evolving
                collection of words that hopes to resonate with your inner world.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  