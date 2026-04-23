import { Card, CardContent } from "@/components/ui/card";
import { GiQuillInk, GiCandleFlame, GiSpectacles } from "react-icons/gi";

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center p-6 py-20'>
      <div className="absolute inset-0 bg-[#2c1e16]/5 pointer-events-none" />
      
      <Card className='max-w-4xl mx-auto shadow-[0_0_50px_rgba(0,0,0,0.15)] border-0 bg-transparent relative overflow-hidden'>
        {/* Ornate Frame */}
        <div className="absolute inset-0 border-[30px] border-double border-[#d3a625]/10 pointer-events-none z-10" />
        
        <CardContent className='p-12 md:p-20 relative z-20'>
          <div className='space-y-12'>
            <div className="space-y-4 text-center">
              <div className="flex justify-center gap-6 mb-4">
                <GiSpectacles className="h-10 w-10 text-[#d3a625]/40" />
                <GiQuillInk className="h-10 w-10 text-[#740001]" />
                <GiCandleFlame className="h-10 w-10 text-[#d3a625]/40" />
              </div>
              <h1 className='font-cinzel text-4xl md:text-6xl font-bold tracking-tighter text-[#2c1e16]'>
                The Chronicler&apos;s <br />
                <span className="text-[#740001] italic underline decoration-[#d3a625]/40 underline-offset-8">Manifesto</span>
              </h1>
              <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-[#d3a625] to-transparent mx-auto mt-6"></div>
            </div>

            <div className='font-serif text-xl text-[#2c1e16]/80 flex flex-col gap-8 leading-relaxed italic'>
              <p className="first-letter:text-6xl first-letter:font-cinzel first-letter:text-[#740001] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                Welcome to <strong className="text-[#740001] font-bold">Woven Words</strong> — a quiet corner of the digital aether
                where ink meet emotion. This space is dedicated to the preservation of poems, prose,
                reflections, and the delicate fragments of thought that drift through the scribe&apos;s mind.
              </p>
  
              <p>
                Whether you be a seeker of metaphors or a weary soul finding solace in rhythm,
                this archive offers a blend of personal musings and literary inspirations.
                Here, every entry is a window into a moment, a feeling, or a ghost of a memory.
              </p>
  
              <div className="bg-[#2c1e16]/5 p-8 rounded-sm border-l-4 border-[#740001] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GiQuillInk className="h-20 w-20" />
                </div>
                <p className="text-lg relative z-10">
                  Forged using the modern sorcery of{" "}
                  <a
                    href='https://nextjs.org'
                    target='_blank'
                    rel="noopener noreferrer"
                    className='text-[#740001] font-bold hover:underline decoration-[#d3a625]/30 underline-offset-4'
                  >
                    Next.js
                  </a>{" "}
                  and secured by the guardians of{" "}
                  <a
                    href='https://clerk.dev'
                    target='_blank'
                    rel="noopener noreferrer"
                    className='text-[#740001] font-bold hover:underline decoration-[#d3a625]/30 underline-offset-4'
                  >
                    Clerk
                  </a>
                  , Woven Words is a timeless sanctuary for expression in a flickering world.
                </p>
              </div>
  
              <p>
                We encourage you to unroll the archives, discover new perspectives, 
                and lose yourself in the cadence of storytelling. This is not merely a blog — it is an evolving
                collection of words that hopes to resonate with the echoes of your own inner world.
              </p>
            </div>

            <div className="pt-12 border-t border-[#d3a625]/20 text-center">
               <p className="font-cinzel text-sm tracking-[0.3em] text-[#d3a625] mb-4 uppercase">Signed & Sealed</p>
               <div className="font-serif italic text-[#2c1e16]/60 text-lg">
                 &quot;Words are, in my not-so-humble opinion, our most inexhaustible source of magic.&quot;
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}