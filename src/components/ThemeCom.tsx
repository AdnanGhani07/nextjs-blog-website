"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeCom({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#f4e4bc]" />;
  }

  return (
    <div className={theme}>
      <div className="bg-[#f4e4bc] text-[#2c1e16] min-h-screen selection:bg-[#740001]/20">
        {children}
      </div>
    </div>
  );
}
