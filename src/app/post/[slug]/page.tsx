import CallToAction from "@/components/CallToAction";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RecentPosts from "@/components/RecentPosts";
import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { GiQuillInk, GiScrollUnfurled, GiInkSwirl } from "react-icons/gi";

import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;
  let post: any = null;
  try {
    await connect();
    post = await Post.findOne({ slug });
  } catch (error) {
    console.log("Error fetching post:", error);
  }

  if (!post || post.title === "Failed to load post") {
    notFound();
  }

  const sanitizedContent = DOMPurify.sanitize(post.content ?? "");

  return (
    <main className="flex flex-col max-w-5xl mx-auto min-h-screen py-20 px-6 relative">
      {/* Ornate Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-[#d3a625]/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-[#d3a625]/20 pointer-events-none" />

      <div className="space-y-8 text-center relative z-10">
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="h-px w-20 bg-[#d3a625]/40" />
          <Link
            href={`/search?category=${post.category}`}
            className="font-cinzel text-sm font-black tracking-[0.3em] text-[#740001] uppercase hover:underline"
          >
            {post.category}
          </Link>
          <div className="h-px w-20 bg-[#d3a625]/40" />
        </div>

        <h1 className="font-cinzel text-5xl md:text-7xl font-black leading-none text-[#1a0f0a] tracking-tighter">
          {post.title}
        </h1>

        <div className="flex flex-col items-center gap-4 pt-4">
          <GiQuillInk className="h-10 w-10 text-[#740001]" />
          <div className="flex items-center gap-6 font-serif italic text-lg text-[#1a0f0a] font-bold">
            <span>
              Scribed on{" "}
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </span>
            <span className="h-1 w-1 bg-[#d3a625] rounded-full" />
            <span>{Math.ceil(post?.content?.length / 1000)} min reading</span>
          </div>
        </div>
      </div>

      <div className="relative mt-16 group overflow-hidden border-[16px] border-double border-[#d3a625]/30 shadow-2xl aspect-[21/9]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover grayscale-[0.1] sepia-[0.2] transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#2c1e16]/10 mix-blend-multiply" />
      </div>

      <article className="py-20 font-serif text-xl md:text-2xl leading-[1.8] text-[#1a0f0a] font-medium max-w-3xl mx-auto post-content">
        <div
          className="first-letter:text-7xl first-letter:font-cinzel first-letter:text-[#740001] first-letter:float-left first-letter:mr-3 first-letter:mt-2"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>

      <div className="flex justify-center py-12">
        <GiScrollUnfurled className="h-12 w-12 text-[#d3a625]/40" />
      </div>

      <div className="w-full py-20 bg-[#2c1e16]/5 border-y-8 border-double border-[#d3a625]/20">
        <div className="max-w-4xl mx-auto px-6">
          <CallToAction />
        </div>
      </div>

      <div className="py-32 w-full">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <h2 className="font-cinzel text-4xl font-bold tracking-tighter text-[#1a0f0a]">
            Related Scrolls
          </h2>
          <div className="h-1 w-20 bg-[#740001]" />
        </div>
        <RecentPosts limit={3} />
      </div>
    </main>
  );
}
