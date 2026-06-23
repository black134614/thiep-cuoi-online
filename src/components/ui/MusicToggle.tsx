"use client";

import { useMusic } from "@/components/MusicProvider";
import { cn } from "@/lib/utils";

export function MusicToggle() {
  const { playing, ready, toggle, bars } = useMusic();

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/70 bg-wine text-cream-light shadow-lg transition-transform hover:scale-110",
        playing && "animate-emblem-glow",
      )}
    >
      {playing ? (
        <span className="flex h-5 items-end justify-center gap-[3px]" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-cream-light transition-[height] duration-75 ease-out"
              style={{ height: `${Math.round(h * 20)}px` }}
            />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
