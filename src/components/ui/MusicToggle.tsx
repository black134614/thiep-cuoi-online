"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Nút nhạc nền nổi góc phải dưới (giống trang mẫu) */
export function MusicToggle({
  src,
  autoPlay = false,
}: {
  src?: string;
  autoPlay?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!src) return;
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    if (autoPlay) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
    setVisible(true);
    return () => {
      audioRef.current?.pause();
    };
  }, [src, autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  if (!src || !visible) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-wine text-cream-light shadow-lg transition-transform hover:scale-110",
        playing && "animate-pulse-glow",
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        {playing ? (
          <>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </>
        ) : (
          <path d="M8 5v14l11-7z" />
        )}
      </svg>
    </button>
  );
}
