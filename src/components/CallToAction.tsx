import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FiFeather, FiArrowRight } from "react-icons/fi";

export default function CallToAction() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card/80 to-muted/30 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-xl">
      {/* Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        {/* Text Section */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-cinzel font-bold tracking-widest uppercase">
            <FiFeather className="h-3.5 w-3.5" />
            Invitation to Scribes
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            Master the Art of <br />
            <span className="editorial-gradient-text font-serif italic">Weaving Words</span>
          </h2>

          <p className="font-serif text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
            &quot;Every stroke is a reflection, every page a sanctuary.&quot; Join our fellowship of writers, poets, and thinkers. Share your verses with the world.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="font-cinzel text-xs font-bold tracking-wider rounded-full px-8 h-12 bg-primary text-primary-foreground hover:opacity-90 shadow-md gap-2"
              >
                Sign the Ledger
                <FiArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href="https://poetryfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="font-cinzel text-xs font-bold tracking-wider rounded-full px-8 h-12 border-border/80 hover:bg-muted"
              >
                Learn the Craft
              </Button>
            </a>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="flex-1 w-full max-w-md lg:max-w-none">
          <div className="relative group aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1050&q=80"
              alt="Editorial Archives"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
}
