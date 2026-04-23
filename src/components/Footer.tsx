'use client';

import Link from 'next/link';
import { BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';
import { Separator } from '@/components/ui/separator';

export default function FooterCom() {
  return (
    <footer className='border-t-2 bg-background'>
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
          <div className='col-span-1 md:col-span-1'>
            <Link
              href='/'
              className='inline-block text-xl font-bold transition-all hover:opacity-90'
            >
              <span className='px-3 py-1 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 rounded-md text-white'>
                Woven Words
              </span>
            </Link>
            <p className='mt-4 text-sm text-muted-foreground leading-relaxed'>
              A sanctuary for storytellers, journal keepers, and seekers of rhythm and meaning. 
              Exploring the depths of human emotion through prose and poetry.
            </p>
          </div>
          
          <div className='grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-primary'>Explore</h3>
              <ul className='flex flex-col gap-2 text-sm text-muted-foreground'>
                <li>
                  <a href='https://www.poetryfoundation.org/' target='_blank' rel='noopener noreferrer' className='hover:text-primary transition-colors'>
                    Poetry Foundation
                  </a>
                </li>
                <li>
                  <a href='https://www.poemhunter.com/' target='_blank' rel='noopener noreferrer' className='hover:text-primary transition-colors'>
                    Poem Hunter
                  </a>
                </li>
              </ul>
            </div>
            
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-primary'>Connect</h3>
              <ul className='flex flex-col gap-2 text-sm text-muted-foreground'>
                <li>
                  <a href='https://github.com/AdnanGhani07' target='_blank' rel='noopener noreferrer' className='hover:text-primary transition-colors'>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href='https://instagram.com/__mikaelson__' target='_blank' rel='noopener noreferrer' className='hover:text-primary transition-colors'>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-primary'>Legal</h3>
              <ul className='flex flex-col gap-2 text-sm text-muted-foreground'>
                <li>
                  <Link href='/privacy' className='hover:text-primary transition-colors'>
                    Privacy & Solitude
                  </Link>
                </li>
                <li>
                  <Link href='/terms' className='hover:text-primary transition-colors'>
                    Terms of Thought
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className='my-8' />

        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Woven Words. All rights reserved.
          </p>
          <div className='flex items-center gap-6'>
            <a href='https://instagram.com/__mikaelson__' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-primary transition-colors'>
              <BsInstagram className='h-5 w-5' />
              <span className='sr-only'>Instagram</span>
            </a>
            <a href='https://x.com/Adnan_Ghani_7' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-primary transition-colors'>
              <BsTwitter className='h-5 w-5' />
              <span className='sr-only'>Twitter</span>
            </a>
            <a href='https://github.com/AdnanGhani07' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-primary transition-colors'>
              <BsGithub className='h-5 w-5' />
              <span className='sr-only'>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
