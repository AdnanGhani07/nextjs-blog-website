import { Card, CardContent } from "@/components/ui/card";
import { GiQuillInk } from "react-icons/gi";
import { FiFeather, FiBookOpen } from "react-icons/fi";

export default function About() {
  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center">
      <Card className="max-w-3xl mx-auto rounded-3xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden relative">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <CardContent className="p-8 sm:p-14 relative z-10 space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 mx-auto mb-2">
              <GiQuillInk className="h-6 w-6" />
            </div>
            <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              The Chronicler&apos;s{" "}
              <span className="editorial-gradient-text font-serif italic">
                Manifesto
              </span>
            </h1>
            <p className="text-xs font-cinzel tracking-widest text-muted-foreground uppercase">
              About Woven Words
            </p>
          </div>

          {/* Body Prose */}
          <div className="space-y-6 font-serif text-lg sm:text-xl text-foreground/80 leading-relaxed italic">
            <p className="first-letter:text-6xl first-letter:font-cinzel first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-bold">
              Welcome to{" "}
              <strong className="text-primary font-bold not-italic">
                Woven Words
              </strong>
              —a quiet sanctuary in the digital aether where thought meets
              cadence. This space is dedicated to the preservation of poetry,
              prose, philosophical musings, and the delicate reflections that
              drift through the scribe&apos;s mind.
            </p>

            <p>
              Whether you are a seeker of metaphors or a weary traveler finding
              solace in quiet rhythms, this publication offers a curated blend
              of literary creations and artistic reflections.
            </p>

            <p>
              We invite you to explore the archives, reflect on new
              perspectives, and find resonance within these pages.
            </p>
          </div>

          {/* Quote Footer */}
          <div className="pt-8 border-t border-border/50 text-center space-y-2">
            <p className="font-serif italic text-muted-foreground text-sm">
              &quot;Words are our most inexhaustible source of magic.&quot;
            </p>
            <p className="font-cinzel text-xs font-bold tracking-widest text-primary uppercase">
              Signed & Sealed • Woven Words
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
