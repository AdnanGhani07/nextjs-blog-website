import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { GiQuill, GiSpellBook } from "react-icons/gi";

export default function CallToAction() {
  return (
    <Card className="overflow-hidden border-0 bg-transparent relative">
      {/* Ornate Background Frame */}
      <div className="absolute inset-0 border-[20px] border-double border-[#d3a625]/30 pointer-events-none rounded-lg" />
      <div className="absolute inset-4 border-2 border-[#d3a625]/20 pointer-events-none rounded-md" />

      <CardContent className="p-12 flex flex-col lg:flex-row gap-12 items-center relative z-10">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#740001] text-white font-cinzel text-xs font-black tracking-[0.3em] uppercase shadow-lg">
            <GiSpellBook className="h-5 w-5" />
            Invitation to the Scribes
          </div>

          <h2 className="font-cinzel text-5xl font-black tracking-tighter text-[#1a0f0a] leading-none">
            Master the Art of <br />
            <span className="text-[#740001] italic underline decoration-[#d3a625] underline-offset-8">Weaving Words</span>
          </h2>
          <p className="font-serif text-xl text-[#1a0f0a] leading-relaxed italic font-bold">
            &quot;Every ink stroke is a spell, every page a sanctuary.&quot; Join our
            circle of thinkers and dreamers. Contribute your verses to the
            ever-growing archives of Woven Words.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Link 
              href="/sign-up"
              className="inline-flex items-center justify-center font-cinzel font-black tracking-widest bg-[#740001] hover:bg-[#1a0f0a] text-white shadow-2xl transition-all hover:-translate-y-1 px-10 rounded-none h-16 border-4 border-double border-[#d3a625]/30"
            >
              <GiQuill className="mr-3 h-6 w-6" />
              Sign the Ledger
            </Link>
            <a
              href="https://poetryfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-cinzel font-black tracking-widest border-4 border-double border-[#d3a625] text-[#740001] hover:bg-[#d3a625]/10 rounded-none h-16 px-10 bg-white/20"
            >
              Learn the Craft
            </a>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="relative group aspect-[4/3] overflow-hidden rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.25)] border-4 border-[#d3a625]/20">
            {/* Decorative Overlay */}
            <div className="absolute inset-0 z-20 border-8 border-white/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[#740001]/10 mix-blend-multiply z-10" />

            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1050&q=80"
              alt="Magical Archives"
              fill
              className="object-cover grayscale-[0.1] sepia-[0.2] transition-transform group-hover:scale-105 duration-1000"
            />

            {/* Floating Magical Particle Effect (CSS) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
              <div className="absolute top-1/4 left-1/4 h-1.5 w-1.5 bg-white rounded-full animate-ping opacity-60 shadow-[0_0_15px_white]" />
              <div className="absolute bottom-1/3 right-1/4 h-2.5 w-2.5 bg-[#d3a625] rounded-full animate-pulse opacity-50 shadow-[0_0_20px_#d3a625]" />
              <div className="absolute top-1/2 right-1/3 h-1.5 w-1.5 bg-white rounded-full animate-ping delay-700 opacity-60" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
