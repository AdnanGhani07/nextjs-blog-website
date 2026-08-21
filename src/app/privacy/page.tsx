import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <header className="text-center space-y-4 mb-10">
        <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Privacy & <span className="editorial-gradient-text font-serif italic">Solitude</span>
        </h1>
        <p className="font-serif italic text-muted-foreground text-lg">
          “Solitude is not the absence of company, but the moment when the soul is free to speak.”
        </p>
      </header>

      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border/60 shadow-lg mb-10">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Peaceful landscape"
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      <div className="font-serif text-lg text-foreground/80 space-y-6 leading-relaxed">
        <p>
          In this quiet corner of the web, your privacy is sacred. Just as a personal journal holds whispered thoughts, this site respects the sanctity of your presence.
        </p>
        <p>
          We do not chase you with invasive trackers or pry into your reading habits. The pieces you read and the pages you linger on belong to you alone.
        </p>
        <div className="p-6 rounded-2xl bg-card/80 border border-border/60 space-y-2">
          <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-primary">
            Our Commitments
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
            <li>No intrusive ads or third-party behavioral trackers</li>
            <li>No unnecessary data collection</li>
            <li>No sharing or selling of personal information</li>
          </ul>
        </div>
        <p>
          Any information you provide (such as your account details) is solely used to deliver an authentic, seamless reading and writing experience.
        </p>
      </div>
    </div>
  );
}
