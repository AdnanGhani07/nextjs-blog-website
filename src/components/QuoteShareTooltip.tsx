"use client";

import React, { useState, useEffect } from "react";
import { FiCopy, FiCheck, FiShare2 } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function QuoteShareTooltip() {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setPosition(null);
        setSelectedText("");
        return;
      }

      const text = selection.toString().trim();
      if (text.length > 5) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectedText(text);
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY - 10,
        });
      } else {
        setPosition(null);
        setSelectedText("");
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  if (!position || !selectedText) return null;

  const handleCopyQuote = () => {
    const quoteText = `“${selectedText}” — Woven Words (${window.location.href})`;
    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTweetQuote = () => {
    const tweetText = `“${selectedText.slice(0, 180)}...” via @WovenWords\n${window.location.href}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%)",
      }}
      className="fixed z-50 flex items-center gap-1.5 p-1.5 rounded-xl bg-foreground text-background shadow-2xl border border-border/20 text-xs animate-in fade-in zoom-in-95 duration-150"
    >
      <button
        onClick={handleCopyQuote}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-background/20 transition-colors font-medium"
        title="Copy formatted quote"
      >
        {copied ? <FiCheck className="h-3.5 w-3.5 text-emerald-400" /> : <FiCopy className="h-3.5 w-3.5" />}
        <span>{copied ? "Copied" : "Copy Quote"}</span>
      </button>

      <div className="h-3.5 w-px bg-background/20" />

      <button
        onClick={handleTweetQuote}
        className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-background/20 transition-colors font-medium text-sky-400"
        title="Tweet this quote"
      >
        <FaXTwitter className="h-3.5 w-3.5" />
        <span>Share</span>
      </button>
    </div>
  );
}
