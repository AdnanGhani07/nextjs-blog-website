"use client";

import React, { useEffect, useState } from "react";
import { FiSliders, FiSun, FiBookOpen, FiMaximize2, FiMinimize2 } from "react-icons/fi";

interface ReaderControlsProps {
  onFontChange?: (font: string) => void;
  onSizeChange?: (size: string) => void;
  onThemeChange?: (theme: string) => void;
}

export default function ReaderControls({
  onFontChange,
  onSizeChange,
  onThemeChange,
}: ReaderControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState("font-serif");
  const [fontSize, setFontSize] = useState("md");
  const [paperTheme, setPaperTheme] = useState("default");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Apply changes to document / post article container
    const article = document.querySelector(".post-content-container");
    if (article) {
      // Reset & apply fonts
      article.classList.remove("reader-font-serif", "reader-font-sans", "reader-font-mono");
      article.classList.add(`reader-${fontFamily}`);

      // Reset & apply sizes
      article.classList.remove("reader-size-sm", "reader-size-md", "reader-size-lg", "reader-size-xl");
      article.classList.add(`reader-size-${fontSize}`);
    }

    // Paper Theme classes
    const wrapper = document.querySelector(".post-reader-wrapper");
    if (wrapper) {
      wrapper.classList.remove("theme-default", "theme-sepia", "theme-slate");
      wrapper.classList.add(`theme-${paperTheme}`);
    }
  }, [fontFamily, fontSize, paperTheme]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-2xl w-72 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-xs font-cinzel font-bold tracking-wider text-foreground">
              READER CUSTOMIZER
            </span>
            <button
              onClick={toggleFullscreen}
              className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <FiMinimize2 className="h-3.5 w-3.5" /> : <FiMaximize2 className="h-3.5 w-3.5" />}
              {isFullscreen ? "Exit" : "Distraction-Free"}
            </button>
          </div>

          {/* Typography */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Typeface
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: "font-serif", label: "Serif" },
                { id: "font-sans", label: "Sans" },
                { id: "font-mono", label: "Mono" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFontFamily(f.id);
                    onFontChange?.(f.id);
                  }}
                  className={`py-1 text-xs rounded-lg border transition-all ${
                    fontFamily === f.id
                      ? "bg-primary text-primary-foreground border-primary font-medium"
                      : "bg-muted/50 border-border/50 hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Text Size
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: "sm", label: "S" },
                { id: "md", label: "M" },
                { id: "lg", label: "L" },
                { id: "xl", label: "XL" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setFontSize(s.id);
                    onSizeChange?.(s.id);
                  }}
                  className={`py-1 text-xs rounded-lg border transition-all ${
                    fontSize === s.id
                      ? "bg-primary text-primary-foreground border-primary font-bold"
                      : "bg-muted/50 border-border/50 hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Atmosphere */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Paper Warmth
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "default", label: "Default", color: "bg-background border-border text-foreground" },
                { id: "sepia", label: "Sepia", color: "bg-[#fbf0d9] border-[#d8c7a6] text-[#433422]" },
                { id: "slate", label: "Slate", color: "bg-[#1e2430] border-[#334155] text-[#e2e8f0]" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPaperTheme(p.id);
                    onThemeChange?.(p.id);
                  }}
                  className={`py-1.5 text-[11px] rounded-lg border flex items-center justify-center font-medium transition-all ${
                    paperTheme === p.id ? "ring-2 ring-primary ring-offset-1" : "opacity-80 hover:opacity-100"
                  } ${p.color}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs font-cinzel tracking-wider border border-primary/30 ml-auto"
        aria-label="Reading mode options"
      >
        <FiBookOpen className="h-4 w-4" />
        <span>Reader Mode</span>
        <FiSliders className="h-3 w-3 opacity-70" />
      </button>
    </div>
  );
}
