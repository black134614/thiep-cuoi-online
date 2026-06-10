"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types/wedding";

const COINS = [
  { top: "8%", left: "12%", delay: "0s" },
  { top: "18%", right: "8%", delay: "0.8s" },
  { top: "55%", left: "5%", delay: "1.5s" },
  { top: "65%", right: "12%", delay: "0.4s" },
  { bottom: "12%", left: "20%", delay: "2s" },
  { bottom: "18%", right: "18%", delay: "1.2s" },
];

const CORNERS = ["tl", "tr", "bl", "br"] as const;

export function GiftEnvelope({ data, className }: SectionProps) {
  const { giftAccounts } = data;
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(true);
      setClosing(false);
    }, 500);
  };

  const copyAccount = async (num: string) => {
    await navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const active = giftAccounts[activeTab];

  return (
    <section className={`section-cream py-10 text-center sm:py-14 ${className ?? ""}`}>
      <RevealOnScroll variant="blur-up">
        <h2 className="font-serif text-lg font-semibold uppercase tracking-[0.2em] text-gold-dark sm:text-xl">
          Phong Bao Mừng Cưới
        </h2>
      </RevealOnScroll>

      <Container className="py-8">
        {!open ? (
          <RevealOnScroll variant="fade-scale" delay={100}>
            <div className="relative mx-auto h-[17rem] w-56 sm:h-72 sm:w-60">
              {COINS.map((c, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute animate-coin-float text-2xl text-gold drop-shadow-[0_0_6px_rgba(201,162,75,0.6)]"
                  style={{
                    top: c.top,
                    left: c.left,
                    right: c.right,
                    bottom: c.bottom,
                    animationDelay: c.delay,
                  }}
                >
                  🪙
                </span>
              ))}

              <button
                onClick={handleOpen}
                className={cn(
                  "gift-envelope relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center transition-transform hover:scale-[1.02]",
                  closing && "animate-envelope-open",
                )}
              >
                {CORNERS.map((c) => (
                  <span key={c} className={`gift-envelope__corner gift-envelope__corner--${c}`} />
                ))}

                <div className="gift-envelope__seal">
                  <span className="font-serif text-4xl text-wine sm:text-5xl">囍</span>
                </div>
              </button>

              <p className="mt-4 font-sans text-xs tracking-wider text-ink/45">
                Nhấn để mở
              </p>
            </div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll variant="fade-up">
            <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
              {giftAccounts.map((acc, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "rounded-full px-5 py-2 font-serif text-sm transition",
                    i === activeTab
                      ? "bg-wine text-cream-light"
                      : "bg-cream-dark text-ink/60 hover:bg-gold/20",
                  )}
                >
                  {acc.owner}
                </button>
              ))}
            </div>

            {active && (
              <div className="mx-auto max-w-sm rounded-2xl border border-gold/20 bg-cream-light p-6 shadow-lg">
                <p className="font-serif text-lg font-semibold text-crimson">
                  {active.bankName}
                </p>
                <p className="mt-3 break-all font-mono text-base tracking-wider text-ink sm:text-xl">
                  {active.accountNumber}
                </p>
                <p className="mt-1 font-serif text-sm text-ink/60">{active.accountHolder}</p>

                {active.qrImage && (
                  <div className="relative mx-auto mt-4 h-40 w-40">
                    <Image
                      src={active.qrImage}
                      alt={`QR ${active.owner}`}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}

                <button
                  onClick={() => copyAccount(active.accountNumber ?? "")}
                  className="mt-4 rounded-full bg-wine px-6 py-2 font-serif text-sm text-cream-light transition hover:bg-wine-dark"
                >
                  {copied ? "Đã sao chép!" : "Sao chép STK"}
                </button>
              </div>
            )}
          </RevealOnScroll>
        )}
      </Container>
    </section>
  );
}
