"use client";

import { Container } from "@/components/ui/Container";
import { SectionBand } from "@/components/ui/SectionBand";
import { DateDisplay } from "@/components/ui/DateDisplay";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useGuestName } from "@/components/GuestNameProvider";
import type { SectionProps } from "@/types/wedding";

export function WeddingInfo({ data, className }: SectionProps) {
  const { groom, bride, groomParents, brideParents, ceremony } = data;
  const { guestName } = useGuestName();

  return (
    <section className={`section-cream py-0 ${className ?? ""}`}>
      <SectionBand title="Thông tin lễ cưới" />
      <Container className="py-10 text-center sm:py-14">
        {guestName && (
          <RevealOnScroll variant="fade-up">
            <p className="mb-8 font-serif text-base text-crimson">
              Kính mời <span className="font-semibold">{guestName}</span> đến dự lễ thành hôn
            </p>
          </RevealOnScroll>
        )}
        <RevealOnScroll variant="fade-up">
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
                  <p className="mt-2 font-sans text-xs leading-relaxed text-ink/50">
                    {p.address}
                  </p>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="blur-up" delay={100}>
          <p className="mt-10 font-serif text-sm leading-relaxed tracking-wide text-crimson">
            TRÂN TRỌNG BÁO TIN
            <br />
            LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
          </p>
        </RevealOnScroll>

        <RevealOnScroll variant="fade-scale" delay={200}>
          <div className="my-8 flex flex-col items-center gap-2">
            <h3 className="couple-name">{groom.fullName}</h3>
            <p className="font-classic text-xs uppercase tracking-[0.2em] text-ink/60">
              {groom.title}
            </p>
            <p className="font-script text-4xl text-ink/50 sm:text-5xl">&amp;</p>
            <h3 className="couple-name">{bride.fullName}</h3>
            <p className="font-classic text-xs uppercase tracking-[0.2em] text-ink/60">
              {bride.title}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="fade-up" delay={300}>
          <p className="font-serif text-sm tracking-wide text-crimson">
            LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI
            <br />
            <span className="text-base font-semibold uppercase">
              {ceremony.venueName}
            </span>
          </p>
          {ceremony.date.time && (
            <p className="mt-2 font-classic text-sm uppercase text-ink/60">
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
