import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";

export default function PostCard({ post }: { post: any }) {
  const postImage =
    post.image && post.image.trim() !== ""
      ? post.image
      : "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="group relative flex flex-col w-full max-w-[390px] rounded-2xl border border-border/60 bg-card/80 dark:bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40">
      {/* Featured Image */}
      <Link href={`/post/${post.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40 block">
        <Image
          src={postImage}
          alt={post.title || "Post thumbnail"}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-cinzel font-bold uppercase tracking-wider bg-background/90 text-foreground backdrop-blur-md border border-border/50 shadow-sm">
            {post.category || "General"}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs font-serif text-muted-foreground">
            <FiCalendar className="h-3.5 w-3.5 text-primary" />
            <span>
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <Link href={`/post/${post.slug}`} className="block group/title">
            <h3 className="font-cinzel text-xl font-bold line-clamp-2 leading-tight text-foreground group-hover/title:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
        </div>

        {/* Read Link */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between">
          <Link
            href={`/post/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold tracking-wider text-primary group-hover:text-foreground transition-colors"
          >
            Read Piece
            <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
