"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AiOutlineSearch } from "react-icons/ai";
import { GiQuillInk, GiScrollUnfurled } from "react-icons/gi";

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
  const searchParams = useSearchParams();

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
    { name: "Write Post", href: "/dashboard/create-post" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f4e4bc] border-b-4 border-double border-[#d3a625] shadow-xl">
      <div className="container flex h-20 items-center justify-between mx-auto px-6">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform hover:scale-105"
        >
          <div className="relative">
            <GiQuillInk className="h-10 w-10 text-[#740001] transition-transform group-hover:-rotate-12" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#d3a625] rounded-full shadow-[0_0_8px_#d3a625]" />
          </div>
          <span className="font-cinzel text-2xl font-black tracking-widest text-[#2c1e16]">
            Woven Words
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-cinzel text-sm font-black tracking-wider transition-all hover:text-[#740001] hover:underline decoration-2 underline-offset-8 ${
                path === link.href ? "text-[#740001] underline decoration-[#740001]" : "text-[#2c1e16]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="hidden xl:flex relative group">
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2c1e16] group-focus-within:text-[#740001]" />
            <Input
              type="search"
              placeholder="Search archives..."
              className="pl-10 w-[250px] bg-white/30 border-b-2 border-t-0 border-x-0 border-[#d3a625] rounded-none focus-visible:ring-0 focus-visible:border-[#740001] transition-all italic placeholder:text-[#2c1e16]/60 font-serif text-[#2c1e16] font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className="flex items-center gap-4">
            <SignedIn>
              <div className="border-4 border-double border-[#d3a625] rounded-full p-0.5 shadow-md">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-9 w-9",
                    }
                  }}
                  userProfileUrl="/dashboard?tab=profile"
                />
              </div>
            </SignedIn>

            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline" className="font-cinzel font-black tracking-widest border-4 border-double border-[#740001] text-[#740001] hover:bg-[#740001] hover:text-white transition-all bg-white/20">
                  Sign In
                </Button>
              </Link>
            </SignedOut>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" className="hover:bg-[#d3a625]/20 border-2 border-[#d3a625]/50">
                      <GiScrollUnfurled className="h-8 w-8 text-[#2c1e16]" />
                    </Button>
                  }
                />
                <SheetContent side="right" className="bg-[#f4e4bc] border-l-8 border-double border-[#d3a625] font-serif">
                  <SheetHeader>
                    <SheetTitle className="font-cinzel text-3xl font-black text-left border-b-4 border-double border-[#d3a625] pb-4 text-[#2c1e16]">
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-8 mt-10">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`font-cinzel text-2xl font-black transition-colors hover:text-[#740001] ${
                          path === link.href ? "text-[#740001]" : "text-[#2c1e16]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
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
