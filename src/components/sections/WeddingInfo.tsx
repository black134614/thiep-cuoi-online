import { Container } from "@/components/ui/Container";
import { SectionBand } from "@/components/ui/SectionBand";
import { DateDisplay } from "@/components/ui/DateDisplay";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SectionProps } from "@/types/wedding";

export function WeddingInfo({ data, className }: SectionProps) {
  const { groom, bride, groomParents, brideParents, ceremony } = data;

  return (
    <section className={`section-cream py-0 ${className ?? ""}`}>
      <SectionBand title="Thông tin lễ cưới" />
      <Container className="py-10 text-center sm:py-14">
        <RevealOnScroll>
          {/* Cha mẹ hai bên */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[groomParents, brideParents].map((p, i) => (
              <div
                key={i}
                className={`px-4 ${i === 0 ? "sm:border-r sm:border-ink/20" : ""}`}
              >
                <p className="font-serif text-sm text-ink/60">{p.prefix ?? "Ông Bà"}</p>
                <p className="mt-1 font-serif text-base font-semibold text-crimson">
                  {p.father}
                </p>
                <p className="font-serif text-base font-semibold text-crimson">
                  {p.mother}
                </p>
                {p.address && (
                  <p className="mt-2 text-xs leading-relaxed text-ink/50">{p.address}</p>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <p className="mt-10 font-serif text-sm leading-relaxed tracking-wide text-crimson">
            TRÂN TRỌNG BÁO TIN
            <br />
            LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="my-8 flex flex-col items-center gap-2">
            <h3 className="font-display w-[80%] whitespace-nowrap text-[32px] leading-[50px] text-crimson sm:text-[40px] sm:leading-[80px]">
              {groom.fullName}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/60">
              {groom.title}
            </p>
            <p className="font-display text-[30px] text-ink/60">&amp;</p>
            <h3 className="font-display w-[80%] whitespace-nowrap text-[32px] leading-[50px] text-crimson sm:text-[40px] sm:leading-[80px]">
              {bride.fullName}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/60">
              {bride.title}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <p className="font-serif text-sm tracking-wide text-crimson">
            LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI
            <br />
            <span className="text-base font-semibold uppercase">
              {ceremony.venueName}
            </span>
          </p>
          {ceremony.date.time && (
            <p className="mt-2 text-sm uppercase text-ink/60">
              Vào lúc {ceremony.date.time}
            </p>
          )}
          <div className="mt-5">
            <DateDisplay date={ceremony.date} />
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
