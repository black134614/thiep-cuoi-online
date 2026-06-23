"use client";

import { useMusicOptional } from "@/components/MusicProvider";
import { cn } from "@/lib/utils";

export function MusicReactiveAmbience() {
  const music = useMusicOptional();
  const playing = music?.playing ?? false;
  const energy = music?.energy ?? 0;

  if (!music) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[5] transition-opacity duration-500",
        playing ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,75,${0.06 + energy * 0.12}) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: `linear-gradient(to top, rgba(128,0,0,${0.04 + energy * 0.1}) 0%, transparent 100%)`,
        }}
      />
      <div
        className="music-ripple absolute left-1/2 top-1/2 h-[min(90vw,28rem)] w-[min(90vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
        style={{
          opacity: 0.15 + energy * 0.35,
          transform: `translate(-50%, -50%) scale(${1 + energy * 0.08})`,
        }}
      />
    </div>
  );
}
