'use client';

import Link from 'next/link';
import { BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';
import { GiQuillInk, GiScrollUnfurled } from 'react-icons/gi';

export default function FooterCom() {
  return (
    <footer className='border-t-8 border-double border-[#d3a625]/50 bg-[#f4e4bc]/80 py-16 relative z-10'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col items-center text-center space-y-12'>
          {/* Ornate Brand Section */}
          <div className='space-y-4'>
            <Link
              href='/'
              className='flex flex-col items-center group'
            >
              <GiQuillInk className="h-14 w-14 text-[#740001] mb-2 transition-transform group-hover:-rotate-12" />
              <span className='font-cinzel text-4xl font-black tracking-[0.3em] text-[#1a0f0a]'>
                Woven Words
              </span>
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#d3a625] to-transparent mt-2" />
            </Link>
            <p className='max-w-md font-serif italic text-[#1a0f0a] leading-relaxed text-lg font-bold'>
              &quot;In the quiet corners of the mind, where the ink flows and the soul speaks. 
              A sanctuary for the timeless art of literary expression.&quot;
            </p>
          </div>
          
          {/* Navigation Scroll */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-4xl pt-8'>
            <div className='space-y-4'>
              <h3 className='font-cinzel text-sm font-black uppercase tracking-[0.2em] text-[#740001]'>The Archives</h3>
              <ul className='flex flex-col gap-3 font-serif text-base font-bold text-[#1a0f0a]'>
                <li><Link href='/' className='hover:text-[#740001] transition-colors underline decoration-transparent hover:decoration-[#740001]'>Home Ledger</Link></li>
                <li><Link href='/search' className='hover:text-[#740001] transition-colors underline decoration-transparent hover:decoration-[#740001]'>Search the Tomes</Link></li>
                <li><Link href='/collections' className='hover:text-[#740001] transition-colors underline decoration-transparent hover:decoration-[#740001]'>Curated Scrolls</Link></li>
              </ul>
            </div>
            
            <div className='space-y-4'>
              <h3 className='font-cinzel text-sm font-black uppercase tracking-[0.2em] text-[#740001]'>External Wisdom</h3>
              <ul className='flex flex-col gap-3 font-serif text-base font-bold text-[#1a0f0a]'>
                <li><a href='https://www.poetryfoundation.org/' target='_blank' rel='noopener noreferrer' className='hover:text-[#740001] transition-colors underline decoration-transparent hover:decoration-[#740001]'>Poetry Foundation</a></li>
                <li><a href='https://www.poemhunter.com/' target='_blank' rel='noopener noreferrer' className='hover:text-[#740001] transition-colors underline decoration-transparent hover:decoration-[#740001]'>Poem Hunter</a></li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h3 className='font-cinzel text-sm font-black uppercase tracking-[0.2em] text-[#740001]'>Magical Links</h3>
              <div className='flex justify-center gap-8'>
                <a href='https://instagram.com/__mikaelson__' target='_blank' rel='noopener noreferrer' className='text-[#1a0f0a] hover:text-[#740001] transition-all hover:scale-125'>
                  <BsInstagram className='h-8 w-8' />
                  <span className='sr-only'>Instagram</span>
                </a>
                <a href='https://x.com/Adnan_Ghani_7' target='_blank' rel='noopener noreferrer' className='text-[#1a0f0a] hover:text-[#740001] transition-all hover:scale-125'>
                  <BsTwitter className='h-8 w-8' />
                  <span className='sr-only'>Twitter</span>
                </a>
                <a href='https://github.com/AdnanGhani07' target='_blank' rel='noopener noreferrer' className='text-[#1a0f0a] hover:text-[#740001] transition-all hover:scale-125'>
                  <BsGithub className='h-8 w-8' />
                  <span className='sr-only'>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className='pt-12 border-t-2 border-[#d3a625]/30 w-full flex flex-col items-center gap-4'>
            <GiScrollUnfurled className="h-10 w-10 text-[#740001]" />
            <p className='font-cinzel text-xs tracking-[0.4em] text-[#1a0f0a] font-black uppercase'>
              © {new Date().getFullYear()} Woven Words • Scribed with Devotion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
