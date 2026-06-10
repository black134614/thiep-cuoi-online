"use client";

import Image from "next/image";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { DoubleHappinessField } from "@/components/decor/DoubleHappiness";
import type { SectionProps } from "@/types/wedding";
import { cn } from "@/lib/utils";

interface CoverScreenProps extends SectionProps {
  onOpen?: () => void;
  isOpened?: boolean;
}

export function CoverScreen({ data, onOpen, isOpened, className }: CoverScreenProps) {
  const { groom, bride, reception } = data;
  const monthNum = parseInt(reception.date.month, 10);

  return (
    <section
      className={cn(
        "cover-gradient fixed inset-0 z-40 flex items-center justify-center transition-all duration-1000",
        isOpened && "pointer-events-none opacity-0",
        className,
      )}
    >
      <DoubleHappinessField />

      {/* Tờ thiệp trung tâm */}
      <div
        className={cn(
          "relative z-10 mx-6 w-full max-w-sm transition-all duration-700",
          isOpened && "scale-95 opacity-0",
        )}
      >
        {/* Card đỏ với watermark chữ Hỷ */}
        <div
          className="relative overflow-hidden rounded-2xl px-6 pb-10 pt-16 text-center shadow-2xl animate-pulse-glow"
          style={{ background: "linear-gradient(160deg, #b00000 0%, #8b0000 50%, #6e0000 100%)" }}
        >
          {/* Watermark chữ Hỷ hai bên */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-4 top-8 select-none font-serif text-[120px] leading-none text-white/5"
          >
            囍
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 bottom-8 select-none font-serif text-[120px] leading-none text-white/5"
          >
            囍
          </span>

          {/* Emblem tròn chữ Hỷ */}
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <Image
              src="/images/themes/song-hy-red/sunburst.svg"
              alt=""
              width={80}
              height={80}
              className="absolute inset-0 opacity-90"
              aria-hidden
              priority
            />
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-cream-btn shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/themes/song-hy-red/chu-hy.webp"
                alt="Song Hỷ"
                width={36}
                height={36}
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <span className="hidden font-serif text-2xl text-wine">囍</span>
            </div>
          </div>

          {/* Tên cặp đôi */}
          <h1 className="font-display text-3xl leading-snug text-cream-btn text-shadow-glow sm:text-4xl">
            {groom.shortName}
            <span className="mx-2 font-script text-2xl text-gold-light">&amp;</span>
            {bride.shortName}
          </h1>

          <OrnamentDivider />

          <p className="font-serif text-base text-cream-btn/90">
            {reception.date.day} tháng {monthNum}, {reception.date.year}
          </p>
          <p className="mt-2 font-serif tracking-[0.3em] text-cream-btn/80">Thân Mời</p>

          <button className="btn-open-envelope mt-8" onClick={onOpen}>
            Mở thiệp
          </button>
        </div>
      </div>
    </section>
  );
}
