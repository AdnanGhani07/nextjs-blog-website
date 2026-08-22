"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiPlay, FiPause, FiRotateCcw, FiVolume2 } from "react-icons/fi";

interface AudioArticlePlayerProps {
  textToRead: string;
  title: string;
}

export default function AudioArticlePlayer({ textToRead, title }: AudioArticlePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const cleanText = (htmlOrText: string) => {
    if (typeof window === "undefined") return "";
    const div = document.createElement("div");
    div.innerHTML = htmlOrText;
    return div.textContent || div.innerText || "";
  };

  const handlePlayPause = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const stripped = `${title}. ${cleanText(textToRead)}`;
        const utterance = new SpeechSynthesisUtterance(stripped);
        utterance.rate = playbackRate;

        // Choose smooth english voice if available
        const preferredVoice = voices.find(
          (v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))
        ) || voices.find((v) => v.lang.startsWith("en"));

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleRestart = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setTimeout(() => handlePlayPause(), 100);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 0.85];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);

    if (isPlaying) {
      handleRestart();
    }
  };

  if (!isSupported) return null;

  return (
    <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-card/60 border border-border/80 backdrop-blur-sm shadow-sm max-w-xl mx-auto my-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          <FiVolume2 className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-cinzel font-bold text-foreground tracking-wide">
            Listen to this Story
          </h4>
          <p className="text-[11px] text-muted-foreground">
            {isPlaying ? "Playing article narration..." : "AI voice narrative reader"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={cycleSpeed}
          className="px-2 py-1 text-xs rounded-lg border border-border font-mono hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Playback speed"
        >
          {playbackRate}x
        </button>

        {isPlaying && (
          <button
            onClick={handleRestart}
            className="p-2 text-xs rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Restart playback"
          >
            <FiRotateCcw className="h-3.5 w-3.5" />
          </button>
        )}

        <button
          onClick={handlePlayPause}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          {isPlaying ? <FiPause className="h-4 w-4" /> : <FiPlay className="h-4 w-4" />}
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
      </div>
    </div>
  );
}
