import Link from "next/link";
import CallToAction from "@/components/CallToAction";
import RecentPosts from "@/components/RecentPosts";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Cinematic Neo-Editorial Hero */}
      <section className="relative w-full max-w-6xl mx-auto pt-24 pb-20 px-6 text-center flex flex-col items-center gap-8">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Issue / Journal Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-muted/60 border border-border/80 text-foreground/80 text-xs font-cinzel font-semibold tracking-widest uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          The Literary Gazette
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground leading-[1.05]">
            Woven{" "}
            <span className="editorial-gradient-text font-serif italic">
              Words
            </span>
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
            &quot;Where delicate verses meet profound meditations—an anthology
            of art, poetry, and philosophy in the modern era.&quot;
          </p>
        </div>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/search">
            <Button
              size="lg"
              className="font-cinzel text-xs font-bold tracking-widest rounded-full px-8 h-12 bg-primary text-primary-foreground hover:opacity-90 shadow-lg gap-2"
            >
              <FiBookOpen className="h-4 w-4" />
              Explore Archives
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              size="lg"
              className="font-cinzel text-xs font-bold tracking-widest rounded-full px-8 h-12 border-border/80 hover:bg-muted"
            >
              Meet the Author
            </Button>
          </Link>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="w-full max-w-5xl px-6 mb-16">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Recent Dispatches Section */}
      <section className="w-full max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 border-b border-border/50 pb-6">
          <div>
            <span className="text-xs font-cinzel font-bold tracking-widest text-primary uppercase">
              Fresh Off the Press
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
              Recent Dispatches
            </h2>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-xs font-cinzel font-bold tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            View All Pieces
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <RecentPosts limit={6} />
      </section>

      {/* Featured Callout Section */}
      <section className="w-full max-w-6xl px-6 py-20">
        <CallToAction />
      </section>
    </div>
  );
}
