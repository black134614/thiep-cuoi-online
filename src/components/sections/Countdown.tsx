"use client";

import { useEffect, useState } from "react";
import { getCountdown, type CountdownParts } from "@/lib/utils";
import { generateIcs, downloadIcs } from "@/lib/calendar";
import { MonthCalendar } from "@/components/ui/MonthCalendar";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
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

  const handleAddToCalendar = () => {
    const ics = generateIcs(
      `Tiệc cưới ${data.groom.shortName} & ${data.bride.shortName}`,
      reception.date,
      reception.address,
    );
    downloadIcs(ics, "tiec-cuoi.ics");
  };

  const year = parseInt(reception.date.year, 10);
  const month = parseInt(reception.date.month, 10);
  const day = parseInt(reception.date.day, 10);

  return (
    <section className={`section-cream py-10 text-center sm:py-14 ${className ?? ""}`}>
      <RevealOnScroll>
        <h2 className="font-serif text-xl tracking-wide text-crimson sm:text-2xl">
          Cùng đếm ngược
        </h2>

        {mounted && parts && !parts.isPast ? (
          <p
            className="mt-5 font-serif text-lg text-crimson sm:text-xl"
            suppressHydrationWarning
          >
            {UNITS.map((u, i) => (
              <span key={u.key}>
                {i > 0 && " "}
                <strong>{parts[u.key]}</strong> {u.label}
              </span>
            ))}
          </p>
        ) : mounted && parts?.isPast ? (
          <p className="mt-5 font-serif text-lg text-crimson">
            Hôm nay là ngày trọng đại! 🎉
          </p>
        ) : (
          <p className="mt-5 font-serif text-lg text-crimson">…</p>
        )}
      </RevealOnScroll>

      <RevealOnScroll delay={150}>
        <div className="mt-8">
          <MonthCalendar year={year} month={month} highlightDay={day} />
          <button
            onClick={handleAddToCalendar}
            className="mt-4 font-serif text-sm text-ink/50 underline transition hover:text-crimson"
          >
            Thêm vào lịch
          </button>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={250}>
        <Button className="mt-6">Xác nhận</Button>
      </RevealOnScroll>
    </section>
  );
}
