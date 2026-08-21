import CallToAction from "@/components/CallToAction";
import Link from "next/link";
import RecentPosts from "@/components/RecentPosts";
import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import Image from "next/image";
import { FiCalendar, FiClock, FiShare2, FiChevronRight } from "react-icons/fi";
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
    console.error("Error fetching post:", error);
  }

  if (!post || post.title === "Failed to load post") {
    notFound();
  }

  const sanitizedContent = DOMPurify.sanitize(post.content ?? "");
  const readTime = Math.max(1, Math.ceil((post?.content?.length || 500) / 1000));

  return (
    <main className="flex flex-col max-w-4xl mx-auto min-h-screen py-16 px-6 relative">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-cinzel tracking-wider text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <FiChevronRight className="h-3 w-3" />
        <Link
          href={`/search?category=${encodeURIComponent(post.category || "all")}`}
          className="hover:text-primary transition-colors uppercase"
        >
          {post.category || "General"}
        </Link>
      </nav>

      {/* Post Header Header */}
      <header className="space-y-6 text-center md:text-left mb-12">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-cinzel font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
          {post.category || "General"}
        </div>

        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.08] text-foreground tracking-tight">
          {post.title}
        </h1>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 pt-4 text-xs font-serif text-muted-foreground border-y border-border/50 py-4">
          <span className="flex items-center gap-1.5">
            <FiCalendar className="h-4 w-4 text-primary" />
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative mb-16 rounded-3xl overflow-hidden border border-border/60 shadow-xl aspect-[16/9] w-full bg-muted">
        <Image
          src={
            post.image && post.image.trim() !== ""
              ? post.image
              : "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
          }
          alt={post.title}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="py-8 max-w-3xl mx-auto post-content font-serif text-lg sm:text-xl leading-[1.85] text-foreground/90">
        <div
          className="first-letter:text-6xl sm:first-letter:text-7xl first-letter:font-cinzel first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-bold"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>

      {/* Section Divider */}
      <div className="my-16 flex items-center justify-center">
        <div className="h-px w-32 bg-border" />
      </div>

      {/* Call To Action */}
      <div className="w-full my-12">
        <CallToAction />
      </div>

      {/* Related Posts */}
      <section className="py-16 w-full">
        <div className="flex items-center justify-between mb-10 border-b border-border/50 pb-4">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Related Pieces
          </h2>
          <Link
            href="/search"
            className="text-xs font-cinzel font-bold text-primary hover:underline uppercase tracking-wider"
          >
            All Archives →
          </Link>
        </div>
        <RecentPosts limit={3} />
      </section>
    </main>
  );
}
