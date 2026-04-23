import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GiWaxSeal } from "react-icons/gi";

export default function PostCard({ post }: { post: any }) {
  return (
    <Card className="group relative w-full h-[460px] max-w-[380px] overflow-hidden rounded-sm border-0 bg-transparent shadow-none transition-all hover:-translate-y-2 flex flex-col">
      {/* Vintage Frame */}
      <div className="absolute inset-0 border-[12px] border-double border-[#d3a625]/30 pointer-events-none z-10" />

      <Link
        href={`/post/${post.slug}`}
        className="block overflow-hidden relative h-[180px] m-3 mb-0 flex-shrink-0"
      >
        <Image
          src={post.image}
          alt="post cover"
          fill
          className="object-cover grayscale-[0.2] sepia-[0.3] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:sepia-0"
        />
        <div className="absolute inset-0 bg-[#2c1e16]/20 mix-blend-multiply transition-opacity group-hover:opacity-0" />
      </Link>

      <div className="flex-1 flex flex-col justify-between p-5 pt-3 relative z-20">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-cinzel text-[10px] font-black tracking-[0.2em] text-white bg-[#740001] px-2 py-0.5 rounded-sm uppercase shadow-sm">
              {post.category}
            </span>
            <GiWaxSeal className="h-8 w-8 text-[#740001] transition-transform group-hover:scale-110 group-hover:rotate-12" />
          </div>

          <div className="space-y-1">
            <h3 className="font-cinzel text-lg md:text-xl font-black line-clamp-2 leading-tight text-[#1a0f0a] transition-colors group-hover:text-[#740001]">
              {post.title}
            </h3>
            <div className="h-0.5 w-10 bg-[#d3a625] transition-all group-hover:w-full" />
          </div>

          <p className="font-serif italic text-sm text-[#1a0f0a] font-bold">
            Scribed {new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
          </p>
        </div>

        <Link 
          href={`/post/${post.slug}`} 
          className="mt-3 flex items-center justify-center w-full font-cinzel font-black tracking-widest text-[#1a0f0a] border-2 border-double border-[#d3a625]/40 hover:border-[#740001] hover:text-[#740001] transition-all rounded-none bg-white/20 h-10 text-[10px]"
        >
          Open the Scroll
        </Link>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-[#d3a625]/40 pointer-events-none rounded-br-sm" />
    </Card>
  );
}
