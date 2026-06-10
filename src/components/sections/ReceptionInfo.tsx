import { Container } from "@/components/ui/Container";
import { SectionBand } from "@/components/ui/SectionBand";
import { DateDisplay } from "@/components/ui/DateDisplay";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SectionProps } from "@/types/wedding";

export function ReceptionInfo({ data, className }: SectionProps) {
  const { reception, schedule } = data;
  const welcome = schedule[0];
  const openParty = schedule.find((s) =>
    s.activity.toLowerCase().includes("khai"),
  );

  return (
    <section className={`section-cream py-0 ${className ?? ""}`}>
      <SectionBand title="Thông tin tiệc cưới" />
      <Container className="py-10 text-center sm:py-14">
        <RevealOnScroll variant="blur-up">
          <h3 className="font-serif text-sm tracking-wide text-crimson">
            Tiệc cưới sẽ diễn ra vào lúc:
          </h3>
          <p className="mt-2 font-display text-3xl font-semibold text-crimson sm:text-4xl">
            {reception.date.time}
          </p>
        </RevealOnScroll>

        <RevealOnScroll variant="fade-scale" delay={100}>
          <div className="mt-6">
            <DateDisplay date={reception.date} />
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="fade-up" delay={200}>
          <div className="mt-8 flex justify-center gap-10 sm:gap-16">
            {welcome && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/60">
                  Đón khách
                </p>
                <p className="mt-1 font-serif text-xl font-semibold text-crimson">
                  {welcome.time}
                </p>
              </div>
            )}
            {openParty && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/60">
                  Khai tiệc
                </p>
                <p className="mt-1 font-serif text-xl font-semibold text-crimson">
                  {openParty.time}
                </p>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
