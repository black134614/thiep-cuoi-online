"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types/wedding";

const COINS = [
  { top: "10%", left: "15%", delay: "0s" },
  { top: "20%", right: "10%", delay: "0.8s" },
  { top: "60%", left: "8%", delay: "1.5s" },
  { top: "70%", right: "15%", delay: "0.4s" },
  { bottom: "15%", left: "25%", delay: "2s" },
  { bottom: "20%", right: "20%", delay: "1.2s" },
];

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
      <RevealOnScroll>
        <h2 className="font-serif text-2xl text-gold-dark">Phong Bao Mừng Cưới</h2>
      </RevealOnScroll>

      <Container className="py-8">
        {!open ? (
          <RevealOnScroll delay={100}>
            <div className="relative mx-auto h-64 w-52">
              {/* Đồng xu bay */}
              {COINS.map((c, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute animate-coin-float text-2xl text-gold"
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
                  "relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center rounded-xl shadow-xl transition-transform hover:scale-105",
                  closing && "animate-envelope-open",
                )}
                style={{
                  background: "linear-gradient(160deg, #b00000 0%, #8b0000 100%)",
                  border: "2px solid rgba(201,162,75,0.5)",
                }}
              >
                {/* Góc trang trí */}
                <span className="absolute left-2 top-2 text-gold/40">✦</span>
                <span className="absolute right-2 top-2 text-gold/40">✦</span>
                <span className="absolute bottom-2 left-2 text-gold/40">✦</span>
                <span className="absolute bottom-2 right-2 text-gold/40">✦</span>

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 ring-2 ring-gold/50">
                  <span className="font-serif text-4xl text-gold">囍</span>
                </div>
                <span className="mt-4 text-xs tracking-wider text-cream-btn/80">
                  Nhấn để mở
                </span>
              </button>
            </div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll>
            {/* Tab chú rể / cô dâu */}
            <div className="mb-6 flex justify-center gap-3">
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
              <div className="mx-auto max-w-sm rounded-2xl bg-cream-light p-6 shadow-lg">
                <p className="font-serif text-lg font-semibold text-crimson">
                  {active.bankName}
                </p>
                <p className="mt-3 font-mono text-xl tracking-wider text-ink">
                  {active.accountNumber}
                </p>
                <p className="mt-1 text-sm text-ink/60">{active.accountHolder}</p>

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
