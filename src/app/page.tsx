import Link from "next/link";
import CallToAction from "@/components/CallToAction";
import RecentPosts from "@/components/RecentPosts";
import { GiScrollUnfurled, GiInkSwirl } from "react-icons/gi";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Cinematic Hero Section */}
      <div className="flex flex-col gap-8 py-32 px-6 max-w-5xl text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
          <GiInkSwirl className="h-96 w-96 text-[#740001]" />
        </div>

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#740001]/5 border-2 border-[#740001]/20 text-[#740001] font-cinzel text-xs font-bold tracking-[0.4em] uppercase mb-4 shadow-sm">
            Established MCMXCIV
          </div>
          <h1 className="font-cinzel text-6xl md:text-8xl lg:text-9xl font-bold text-[#2c1e16] tracking-tighter leading-none">
            Woven <br />
            <span className="text-[#740001] italic underline decoration-[#d3a625] underline-offset-[12px] decoration-4">
              Words
            </span>
          </h1>
        </div>

        <p className="font-serif text-xl md:text-2xl text-[#2c1e16] max-w-3xl mx-auto leading-relaxed italic relative z-10 font-medium">
          &quot;Within these digital vellums, words find their rhythm and
          meaning. Explore the curated archives of poems, journals, and
          heartfelt reflections.&quot;
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 relative z-10">
          <Link
            href="/search"
            className="group flex items-center gap-3 font-cinzel text-lg font-bold tracking-widest text-white bg-[#740001] px-10 py-5 border-4 border-double border-[#d3a625] hover:bg-[#2c1e16] transition-all shadow-2xl hover:-translate-y-1"
          >
            <GiScrollUnfurled className="h-6 w-6" />
            Unroll the Archives
          </Link>
          <Link
            href="/about"
            className="font-cinzel text-md font-bold tracking-[0.2em] text-[#2c1e16] hover:text-[#740001] transition-colors underline underline-offset-8 decoration-[#d3a625] decoration-2"
          >
            Meet the Archivist
          </Link>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="w-full max-w-5xl px-6 mb-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d3a625] to-transparent relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
            <GiInkSwirl className="h-10 w-10 text-[#740001]/40" />
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-24 bg-[#2c1e16]/5 border-y-8 border-double border-[#d3a625]/30 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <CallToAction />
        </div>
      </div>

      <div className="p-6 flex flex-col gap-16 py-32 w-full max-w-7xl">

        <div className="flex flex-col items-center gap-4 text-center mb-8">
          <h2 className="font-cinzel text-5xl font-bold tracking-tighter text-[#2c1e16]">
            Recent Dispatches
          </h2>
          <div className="h-1.5 w-24 bg-[#740001] rounded-full" />
        </div>

        <RecentPosts limit={6} />

        <div className="pt-16 flex justify-center">
          <Link
            href="/search?category=all"
            className="group font-cinzel text-xl font-bold tracking-widest text-[#2c1e16] flex items-center gap-6 hover:text-[#740001] transition-all"
          >
            <div className="h-1 w-16 bg-[#740001]/30 group-hover:w-24 group-hover:bg-[#740001] transition-all" />
            Examine All Scrolls
            <div className="h-1 w-16 bg-[#740001]/30 group-hover:w-24 group-hover:bg-[#740001] transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
