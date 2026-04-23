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
  title: "Woven Words | Magical Archives",
  description: "A Full-Stack Literary Blog in the Vintage Wizarding Tradition",
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
          className={`${playfair.variable} ${cinzel.variable} antialiased min-h-screen font-serif text-foreground overflow-x-hidden`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
          >
            <div className="relative flex min-h-screen flex-col">
              <Suspense fallback={<div className="h-20 bg-transparent" />}>
                <Header />
              </Suspense>
              <main className="flex-1 relative z-10">{children}</main>
              <FooterCom />
              {/* Vintage Vignette Overlay */}
              <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.15)_100%)] z-50"></div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
