"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Sparkles } from "lucide-react";

interface AILiterarySummaryProps {
  title: string;
  content: string;
  initialSummary?: string;
  initialThemes?: string[];
}

export default function AILiterarySummary({
  title,
  content,
  initialSummary,
  initialThemes,
}: AILiterarySummaryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState(initialSummary || "");
  const [themes, setThemes] = useState<string[]>(initialThemes || []);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnalysis = async () => {
    if (summary) {
      setIsOpen(!isOpen);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    try {
      const res = await fetch("/api/ai/analyze-literary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
      if (data.themes) setThemes(data.themes);
    } catch (error) {
      console.error("Failed to analyze piece:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background p-4 sm:p-5 shadow-sm">
      <button
        onClick={fetchAnalysis}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-cinzel font-bold text-foreground tracking-wider flex items-center gap-2">
              AI LITERARY INSIGHT & THEMES
              <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-semibold">
                Gemini
              </span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Explore key philosophical motifs and executive takeaways
            </p>
          </div>
        </div>

        <div className="text-muted-foreground group-hover:text-foreground">
          {isOpen ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-border/50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
              <Sparkles className="h-3.5 w-3.5 animate-spin text-primary" />
              <span>Analyzing prose rhythm & literary themes...</span>
            </div>
          ) : (
            <>
              <p className="text-sm font-serif italic text-foreground/90 leading-relaxed">
                &ldquo;{summary || "A thoughtful literary narrative that highlights depth and introspective reflection."}&rdquo;
              </p>

              {themes && themes.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-cinzel text-muted-foreground font-semibold">
                    Core Motifs:
                  </span>
                  {themes.map((theme, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-background border border-border/80 text-[11px] font-serif text-muted-foreground shadow-2xs"
                    >
                      ✦ {theme}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
