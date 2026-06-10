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
        <div className="relative mx-auto max-w-md">
          <div className="timeline-line" />
          <ul className="relative space-y-0">
            {schedule.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <li className="relative flex items-center py-5">
                  <span className="w-[42%] pr-4 text-right font-serif text-base text-crimson">
                    {item.time}
                  </span>
                  <span className="relative z-10 mx-0 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-wine ring-4 ring-cream" />
                  <span className="w-[42%] pl-4 text-left font-serif text-base text-ink/80">
                    {item.activity}
                  </span>
                </li>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
