"use client";

import { useEffect, useState } from "react";
import { getCountdown, type CountdownParts } from "@/lib/utils";
import { MonthCalendar } from "@/components/ui/MonthCalendar";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { RsvpConfirm } from "@/components/sections/RsvpConfirm";
import type { SectionProps } from "@/types/wedding";

const UNITS = [
  { key: "days" as const, label: "ngày" },
  { key: "hours" as const, label: "giờ" },
  { key: "minutes" as const, label: "phút" },
  { key: "seconds" as const, label: "giây" },
];

export function Countdown({ data, className }: SectionProps) {
  const { reception } = data;
  const target = reception.date.iso;
  const [parts, setParts] = useState<CountdownParts | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => setParts(getCountdown(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const year = parseInt(reception.date.year, 10);
  const month = parseInt(reception.date.month, 10);
  const day = parseInt(reception.date.day, 10);

  return (
    <section
      id="rsvp"
      className={`section-cream px-4 py-8 text-center sm:py-14 ${className ?? ""}`}
    >
      <RevealOnScroll variant="blur-up">
        <h2 className="font-serif text-lg font-semibold tracking-wide text-crimson sm:text-2xl">
          Cùng đếm ngược
        </h2>

        {mounted && parts && !parts.isPast ? (
          <div
            className="mt-5 flex flex-wrap justify-center gap-x-2 gap-y-1 font-serif text-base text-crimson sm:text-xl"
            suppressHydrationWarning
          >
            {UNITS.map((u) => (
              <span key={u.key} className="whitespace-nowrap">
                <strong>{parts[u.key]}</strong> {u.label}
              </span>
            ))}
          </div>
        ) : mounted && parts?.isPast ? (
          <p className="mt-5 font-serif text-base text-crimson sm:text-lg">
            Hôm nay là ngày trọng đại! 🎉
          </p>
        ) : (
          <p className="mt-5 font-serif text-base text-crimson">…</p>
        )}
      </RevealOnScroll>

      <RevealOnScroll variant="fade-scale" delay={150}>
        <div className="mt-6 sm:mt-8">
          <MonthCalendar year={year} month={month} highlightDay={day} />
        </div>
      </RevealOnScroll>

      <RsvpConfirm data={data} />
    </section>
  );
}
