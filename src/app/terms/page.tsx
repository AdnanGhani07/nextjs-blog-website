export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <header className="text-center space-y-4 mb-12">
        <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Terms of <span className="editorial-gradient-text font-serif italic">Thought</span>
        </h1>
        <p className="font-serif italic text-muted-foreground text-lg">
          “Every poem, every phrase, every silence—is a piece of truth offered in trust.”
        </p>
      </header>

      <div className="font-serif text-lg text-foreground/80 space-y-6 leading-relaxed">
        <p>
          By spending time on Woven Words, you agree to wander thoughtfully. The works shared—whether poems, prose, or reflections—are original unless otherwise noted.
        </p>
        <p>
          You are welcome to quote or reference pieces from this archive, provided proper attribution is given and the context remains respectful.
        </p>

        <div className="p-6 rounded-2xl bg-card/80 border border-border/60 space-y-2">
          <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-primary">
            Guiding Principles
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
            <li>Do not republish full texts without permission.</li>
            <li>Do not use writings here for commercial gain without explicit authorization.</li>
            <li>Engage with openness, constructive feedback, and mutual respect.</li>
          </ul>
        </div>

        <p>
          This is a sanctuary for sincere expression and thoughtful minds. Let us keep it warm, welcoming, and inspiring.
        </p>
      </div>
    </div>
  );
}