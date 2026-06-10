"use client";

import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SectionProps } from "@/types/wedding";

export function Timeline({ data, className }: SectionProps) {
  const { schedule } = data;

  return (
    <section className={`section-cream py-0 ${className ?? ""}`}>
      <div className="section-band bg-transparent text-crimson">
        <h2 className="font-serif text-sm font-semibold uppercase tracking-[0.12em] sm:text-2xl sm:tracking-[0.25em]">
          Lịch trình ngày cưới
        </h2>
      </div>
      <Container className="py-8 sm:py-14">
        <RevealOnScroll variant="blur-up">
          <div className="relative mx-auto max-w-md px-1">
            <div aria-hidden className="timeline-line" />
            <ul className="relative">
              {schedule.map((item, i) => (
                <li key={i} className="flex items-center py-3.5 sm:py-5">
                  <span className="min-w-0 flex-1 pr-2 text-right font-serif text-sm text-crimson sm:pr-6 sm:text-base">
                    {item.time}
                  </span>
                  <span
                    aria-hidden
                    className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full bg-wine ring-[3px] ring-cream"
                  />
                  <span className="min-w-0 flex-1 break-words pl-2 text-left font-serif text-sm text-ink/80 sm:pl-6 sm:text-base">
                    {item.activity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
