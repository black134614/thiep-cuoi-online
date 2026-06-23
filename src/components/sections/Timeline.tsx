"use client";

import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SectionProps } from "@/types/wedding";
import { cn } from "@/lib/utils";

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
                <li
                  key={`${item.time}-${item.activity}`}
                  className={cn(
                    "flex items-center py-3 sm:py-4",
                    item.main && "py-4 sm:py-5",
                  )}
                >
                  <span
                    className={cn(
                      "min-w-0 flex-1 pr-2 text-right font-serif sm:pr-6",
                      item.main
                        ? "text-base font-semibold text-crimson sm:text-lg"
                        : "text-sm text-ink/55 sm:text-base",
                    )}
                  >
                    {item.time}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 shrink-0 rounded-full bg-wine ring-[3px] ring-cream",
                      item.main ? "h-3.5 w-3.5 ring-[4px]" : "h-2 w-2 opacity-70",
                    )}
                  />
                  <span
                    className={cn(
                      "min-w-0 flex-1 break-words pl-2 text-left font-serif sm:pl-6",
                      item.main
                        ? "text-base font-semibold text-crimson sm:text-lg"
                        : "text-sm text-ink/65 sm:text-base",
                    )}
                  >
                    {item.activity}
                    {item.estimate && (
                      <span className="ml-1.5 text-xs font-normal italic text-ink/45">
                        (ước tính)
                      </span>
                    )}
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
