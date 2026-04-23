import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className='min-h-screen bg-muted/30 flex items-center justify-center p-6'>
      <Card className='max-w-3xl mx-auto shadow-xl border-t-4 border-t-primary'>
        <CardContent className='p-8 md:p-12'>
          <div className='space-y-8'>
            <div className="space-y-2 text-center">
              <h1 className='text-4xl md:text-5xl font-serif font-bold tracking-tight'>
                About Woven Words
              </h1>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className='text-lg text-muted-foreground flex flex-col gap-6 leading-relaxed'>
              <p>
                Welcome to <strong className="text-primary font-bold">Woven Words</strong> — a quiet corner of the internet
                where words meet emotion. This space is dedicated to sharing poems, prose,
                reflections, and fragments of thought, curated and penned with love.
              </p>
  
              <p>
                Whether you&apos;re a lover of metaphors or someone seeking solace in verses,
                this blog offers a blend of personal musings and literary inspirations.
                Here, every post is a window into a moment, a feeling, or a memory.
              </p>
  
              <p>
                Built using the latest web technologies like{" "}
                <a
                  href='https://nextjs.org'
                  target='_blank'
                  rel="noopener noreferrer"
                  className='text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4'
                >
                  Next.js
                </a>{" "}
                and secured with{" "}
                <a
                  href='https://clerk.dev'
                  target='_blank'
                  rel="noopener noreferrer"
                  className='text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4'
                >
                  Clerk
                </a>
                , Woven Words is a modern home for timeless expression.
              </p>
  
              <p>
                Readers are encouraged to explore the archive, discover new perspectives, 
                and immerse themselves in the rhythm of storytelling. This isn&apos;t just a blog — it&apos;s an evolving
                collection of words that hopes to resonate with your inner world.
              </p>
            </div>

            <div className="pt-8 border-t text-center italic text-sm text-muted-foreground">
              &quot;Words are, in my not-so-humble opinion, our most inexhaustible source of magic.&quot;
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}