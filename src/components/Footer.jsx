'use client';

import { Footer } from 'flowbite-react';
import Link from 'next/link';
import {
  BsInstagram,
  BsTwitter,
  BsGithub,
} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border-t-8 border-teal-500 shadow-sm'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              href='/'
              className='self-center whitespace-nowrap text-xl font-serif font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 rounded-md text-white'>
                Adnan's
              </span>{' '}
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6 text-sm'>
            <div>
              <Footer.Title title='Explore' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.poetryfoundation.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Poetry Foundation
                </Footer.Link>
                <Footer.Link
                  href='https://www.poemhunter.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Poem Hunter
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Connect' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/AdnanGhani07'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Essentials' />
              <Footer.LinkGroup col>
                <Footer.Link href='/privacy'>Privacy & Solitude</Footer.Link>
                <Footer.Link href='/terms'>Terms of Thought</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between text-sm'>
          <Footer.Copyright
            href='#'
            by="Adnan's Blog"
            year={new Date().getFullYear()}
          />
          <div className='flex gap-6 mt-4 sm:mt-0 sm:justify-center'>
            <Footer.Icon href='https://instagram.com/__mikaelson__' icon={BsInstagram} />
            <Footer.Icon href='https://x.com/Adnan_Ghani_7' icon={BsTwitter} />
            <Footer.Icon
              href='https://github.com/AdnanGhani07'
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
