"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiSearch, FiMenu, FiEdit3 } from "react-icons/fi";
import { GiQuillInk } from "react-icons/gi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const searchTermFromURL = urlParams.get("searchTerm");
    setSearchTerm(searchTermFromURL ?? "");
  }, [searchParams]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Collections", href: "/collections" },
    { name: "Saved", href: "/bookmarks" },
    { name: "Write", href: "/dashboard/create-post" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform hover:opacity-90"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all group-hover:scale-105 group-hover:border-primary/40 group-hover:bg-primary/15 shadow-sm">
            <GiQuillInk className="h-6 w-6 transition-transform group-hover:-rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Woven{" "}
              <span className="text-primary font-serif italic">Words</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-muted/40 p-1.5 rounded-full border border-border/40 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = path === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-cinzel text-xs font-semibold tracking-wider px-5 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-background text-primary shadow-sm font-bold border border-border/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search + Theme Toggle + Auth */}
        <div className="flex items-center gap-4">
          {/* Quick Search */}
          <form
            onSubmit={handleSubmit}
            className="hidden xl:flex relative group"
          >
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search scrolls & essays..."
              className="pl-10 w-[220px] lg:w-[260px] bg-muted/40 border-border/60 rounded-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all text-xs font-serif placeholder:text-muted-foreground/60 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Theme Toggle Button */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
              className="w-9 h-9 rounded-full border border-border/60 bg-muted/30 hover:bg-muted text-foreground transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <FiSun className="h-4 w-4 text-secondary animate-in zoom-in-50 duration-300" />
              ) : (
                <FiMoon className="h-4 w-4 text-primary animate-in zoom-in-50 duration-300" />
              )}
            </Button>
          )}

          {/* Authentication */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <div className="flex items-center justify-center rounded-full border border-border/80 hover:border-primary/50 transition-all p-0.5">
                <UserButton
                  key={isDarkMode ? "clerk-dark" : "clerk-light"}
                  appearance={{
                    baseTheme: isDarkMode ? dark : undefined,
                    variables: {
                      colorPrimary: "#9f1239",
                      borderRadius: "0.75rem",
                    },
                    elements: {
                      userButtonAvatarBox: "h-8 w-8 rounded-full",
                      userButtonTrigger: "focus:shadow-none focus:outline-none flex items-center justify-center",
                    },
                  }}
                  userProfileUrl="/dashboard?tab=profile"
                />
              </div>
            </SignedIn>

            <SignedOut>
              <Link href="/sign-in">
                <Button
                  size="sm"
                  className="font-cinzel text-xs font-bold tracking-wider rounded-full px-5 bg-primary text-primary-foreground hover:opacity-90 shadow-sm transition-all"
                >
                  Sign In
                </Button>
              </Link>
            </SignedOut>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 rounded-full border border-border/60 hover:bg-muted"
                    >
                      <FiMenu className="h-5 w-5 text-foreground" />
                    </Button>
                  }
                />
                <SheetContent
                  side="right"
                  className="bg-background/95 backdrop-blur-xl border-l border-border/60 font-serif w-[300px]"
                >
                  <SheetHeader>
                    <SheetTitle className="font-cinzel text-2xl font-bold text-left border-b border-border/50 pb-4 text-foreground">
                      Woven <span className="text-primary italic">Words</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-3 mt-8">
                    {navLinks.map((link) => {
                      const isActive = path === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`font-cinzel text-lg px-4 py-2.5 rounded-lg font-medium transition-all ${
                            isActive
                              ? "bg-primary/10 text-primary font-bold border-l-4 border-primary"
                              : "text-foreground/80 hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50">
                    <form onSubmit={handleSubmit} className="relative">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-9 bg-muted/40 border-border/60 rounded-lg text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </form>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
