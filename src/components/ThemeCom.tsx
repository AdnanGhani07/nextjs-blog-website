"use client";

import { useEffect, useState } from "react";

export default function ThemeCom({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background text-foreground" />;
  }

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      {children}
    </div>
  );
}
