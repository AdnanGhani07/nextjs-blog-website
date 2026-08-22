"use client";

import React, { useState, useEffect } from "react";
import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";

interface BookmarkButtonProps {
  postId: string;
}

export default function BookmarkButton({ postId }: BookmarkButtonProps) {
  const { isSignedIn } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn) return;

    fetch("/api/user/bookmark")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookmarks && Array.isArray(data.bookmarks)) {
          setIsBookmarked(data.bookmarks.includes(postId));
        }
      })
      .catch(() => {});
  }, [isSignedIn, postId]);

  const handleToggle = async () => {
    if (!isSignedIn) {
      alert("Please sign in to save articles to your reading list.");
      return;
    }

    setIsLoading(true);
    const prev = isBookmarked;
    setIsBookmarked(!prev);

    try {
      const res = await fetch("/api/user/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      setIsBookmarked(data.bookmarked);
    } catch (error) {
      setIsBookmarked(prev);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/80 bg-card/80 hover:bg-card text-foreground hover:scale-105 transition-all text-xs font-cinzel font-bold tracking-wider"
      title={isBookmarked ? "Remove from Reading List" : "Save to Reading List"}
    >
      {isBookmarked ? (
        <FaBookmark className="h-3.5 w-3.5 text-primary" />
      ) : (
        <FiBookmark className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
      )}
      <span>{isBookmarked ? "Saved" : "Save Story"}</span>
    </button>
  );
}
