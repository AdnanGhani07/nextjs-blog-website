import { Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import FooterCom from "@/components/Footer";
import { Metadata } from "next";
import { Suspense } from "react";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Woven Words",
  description:
    "A Curated Anthology of Poetry, Thoughtful Prose, and Philosophical Reflections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${playfair.variable} ${cinzel.variable} antialiased min-h-screen bg-background text-foreground font-serif overflow-x-hidden`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <div className="relative flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
              <Suspense fallback={<div className="h-20 bg-transparent" />}>
                <Header />
              </Suspense>
              <main className="flex-1 relative z-10">{children}</main>
              <FooterCom />

              {/* Subtle Ambient Glow */}
              <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent blur-3xl pointer-events-none -z-10" />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
