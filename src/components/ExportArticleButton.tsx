"use client";

import React from "react";
import { FiDownload, FiFileText, FiPrinter } from "react-icons/fi";

interface ExportArticleButtonProps {
  title: string;
  author?: string;
  content: string;
}

export default function ExportArticleButton({
  title,
  author = "Woven Words Author",
  content,
}: ExportArticleButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const cleanText = (html: string) => {
    if (typeof window === "undefined") return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleDownloadMarkdown = () => {
    const textContent = cleanText(content);
    const mdContent = `# ${title}\n\n*By ${author}* • *Published on Woven Words*\n\n---\n\n${textContent}\n`;
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`;
    link.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handlePrintPDF = () => {
    window.print();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border/80 bg-card/80 hover:bg-card text-foreground transition-all text-xs font-cinzel font-bold tracking-wider"
        title="Export Article"
      >
        <FiDownload className="h-3.5 w-3.5 text-muted-foreground" />
        <span>Export</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-card border border-border shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
          <button
            onClick={handleDownloadMarkdown}
            className="w-full px-3 py-2 text-left text-xs font-medium hover:bg-muted flex items-center gap-2 text-foreground"
          >
            <FiFileText className="h-3.5 w-3.5 text-primary" />
            Markdown (.md)
          </button>
          <button
            onClick={handlePrintPDF}
            className="w-full px-3 py-2 text-left text-xs font-medium hover:bg-muted flex items-center gap-2 text-foreground"
          >
            <FiPrinter className="h-3.5 w-3.5 text-amber-500" />
            Print / Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}
