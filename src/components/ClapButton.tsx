"use client";

import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

interface ClapButtonProps {
  postId: string;
  initialClaps?: number;
}

export default function ClapButton({ postId, initialClaps = 0 }: ClapButtonProps) {
  const [claps, setClaps] = useState(initialClaps);
  const [isClapping, setIsClapping] = useState(false);
  const [userClapsCount, setUserClapsCount] = useState(0);

  const handleClap = async () => {
    setIsClapping(true);
    setClaps((prev) => prev + 1);
    setUserClapsCount((prev) => prev + 1);

    setTimeout(() => setIsClapping(false), 300);

    try {
      await fetch("/api/post/clap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
    } catch (error) {
      console.error("Clap error:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClap}
        className={`group relative flex items-center gap-2 px-4 py-2 rounded-full border border-border/80 bg-card/80 hover:bg-card text-foreground transition-all duration-200 ${
          isClapping ? "scale-110 shadow-md" : "hover:scale-105"
        }`}
        title="Applaud this piece"
      >
        {userClapsCount > 0 ? (
          <FaHeart className="h-4 w-4 text-rose-500 animate-pulse" />
        ) : (
          <FiHeart className="h-4 w-4 text-muted-foreground group-hover:text-rose-500 transition-colors" />
        )}
        <span className="text-xs font-cinzel font-bold tracking-wider">
          {claps}
        </span>

        {isClapping && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-500 animate-bounce">
            +1
          </span>
        )}
      </button>
    </div>
  );
}
