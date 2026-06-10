"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { SectionBand } from "@/components/ui/SectionBand";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types/wedding";

export function Gallery({ data, className }: SectionProps) {
  const { gallery } = data;
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const total = gallery.length;
  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % total),
    [total],
  );

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  if (total === 0) return null;

  const getOffset = (index: number) => {
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section className={`section-cream py-0 ${className ?? ""}`}>
      <SectionBand title="Album ảnh cưới" />
      <RevealOnScroll>
        <div
          className="relative py-10"
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const diff = touchStart - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
          }}
        >
          {/* Coverflow carousel */}
          <div className="relative mx-auto h-[340px] w-full max-w-lg perspective-[800px]">
            {gallery.map((img, i) => {
              const offset = getOffset(i);
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);
              if (absOffset > 2) return null;

              return (
                <div
                  key={i}
                  className="gallery-slide"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: isCenter ? 220 : 160,
                    height: isCenter ? 300 : 220,
                    marginLeft: isCenter ? -110 : -80,
                    marginTop: isCenter ? -150 : -110,
                    transform: `translateX(${offset * 130}px) scale(${isCenter ? 1 : 0.75}) rotateY(${offset * -25}deg)`,
                    opacity: isCenter ? 1 : 0.5,
                    zIndex: 10 - absOffset,
                    filter: isCenter ? "none" : "brightness(0.7)",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src={img.src}
                      alt={img.alt ?? `Ảnh cưới ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nút prev/next */}
          <button
            onClick={prev}
            aria-label="Ảnh trước"
            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-ink/60 shadow transition hover:bg-white"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Ảnh sau"
            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-ink/60 shadow transition hover:bg-white"
          >
            ›
          </button>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {gallery.map((_, i) => (
              <button
                key={i}
                aria-label={`Ảnh ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === active ? "w-6 bg-wine" : "w-2 bg-gold/50",
                )}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
