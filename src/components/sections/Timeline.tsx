"use client";

import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SectionProps } from "@/types/wedding";

export function Timeline({ data, className }: SectionProps) {
  const { schedule } = data;

  return (
    <section className={`section-cream py-0 ${className ?? ""}`}>
      <div className="section-band bg-transparent text-crimson">
        <h2 className="font-serif text-lg font-semibold uppercase tracking-[0.25em] sm:text-2xl">
          Lịch trình ngày cưới
        </h2>
      </div>
      <Container className="py-10 sm:py-14">
        <RevealOnScroll>
          <div className="relative mx-auto max-w-md">
            {/* Một đường dọc liền mạch, căn đúng tâm chấm tròn */}
            <div
              aria-hidden
              className="timeline-line"
            />
            <ul className="relative">
              {schedule.map((item, i) => (
                <li key={i} className="flex items-center py-5">
                  <span className="flex-1 pr-6 text-right font-serif text-base text-crimson">
                    {item.time}
                  </span>
                  <span
                    aria-hidden
                    className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full bg-wine ring-[3px] ring-cream"
                  />
                  <span className="flex-1 pl-6 text-left font-serif text-base text-ink/80">
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
