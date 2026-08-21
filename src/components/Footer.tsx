import Link from 'next/link';
import { BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';
import { GiQuillInk } from 'react-icons/gi';

export default function FooterCom() {
  return (
    <footer className="border-t border-border/60 bg-card/50 backdrop-blur-md py-16 transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-border/50">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <GiQuillInk className="h-5 w-5" />
              </div>
              <span className="font-cinzel text-2xl font-bold tracking-tight text-foreground">
                Woven <span className="text-primary font-serif italic">Words</span>
              </span>
            </Link>
            <p className="max-w-md font-serif text-muted-foreground leading-relaxed text-sm">
              An evolving sanctuary for poetic reflection, artistic prose, and timeless philosophy in the digital aether. Scribed for curious souls and thoughtful minds.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-foreground">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 font-serif text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home Journal
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-primary transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-primary transition-colors">
                  Search Archives
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About the Scribe
                </Link>
              </li>
            </ul>
          </div>

          {/* External & Legal */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-foreground">
              Legal & Inspiration
            </h4>
            <ul className="flex flex-col gap-2.5 font-serif text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy & Solitude
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Thought
                </Link>
              </li>
              <li>
                <a
                  href="https://www.poetryfoundation.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Poetry Foundation ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Woven Words. Crafted with devotion and modern technology.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/__mikaelson__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <BsInstagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://x.com/Adnan_Ghani_7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <BsTwitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://github.com/AdnanGhani07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <BsGithub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
