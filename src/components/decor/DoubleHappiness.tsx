import { cn } from "@/lib/utils";

/** Ký tự Song Hỷ 囍 đơn lẻ */
export function DoubleHappiness({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("select-none font-serif leading-none text-gold/30", className)}
    >
      囍
    </span>
  );
}

/** Nền rải chữ Hỷ vàng kim, có animation float */
export function DoubleHappinessField({ className }: { className?: string }) {
  const items = [
    { top: "5%", left: "8%", size: "text-3xl", opacity: "opacity-15", delay: "0s" },
    { top: "12%", left: "82%", size: "text-2xl", opacity: "opacity-10", delay: "1s" },
    { top: "28%", left: "15%", size: "text-4xl", opacity: "opacity-12", delay: "2s" },
    { top: "35%", left: "90%", size: "text-3xl", opacity: "opacity-18", delay: "0.5s" },
    { top: "55%", left: "5%", size: "text-5xl", opacity: "opacity-[0.08]", delay: "1.5s" },
    { top: "62%", left: "88%", size: "text-4xl", opacity: "opacity-15", delay: "2.5s" },
    { top: "78%", left: "20%", size: "text-2xl", opacity: "opacity-12", delay: "0.8s" },
    { top: "85%", left: "75%", size: "text-3xl", opacity: "opacity-10", delay: "1.8s" },
    { top: "45%", left: "50%", size: "text-6xl", opacity: "opacity-[0.05]", delay: "3s" },
    { top: "92%", left: "45%", size: "text-2xl", opacity: "opacity-12", delay: "2.2s" },
    { top: "18%", left: "55%", size: "text-xl", opacity: "opacity-[0.08]", delay: "1.2s" },
    { top: "70%", left: "60%", size: "text-3xl", opacity: "opacity-10", delay: "0.3s" },
  ];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {items.map((it, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "absolute animate-float select-none text-gold",
            it.size,
            it.opacity,
          )}
          style={{
            top: it.top,
            left: it.left,
            animationDelay: it.delay,
            animationDuration: `${4 + (i % 3)}s`,
          }}
        >
          囍
        </span>
      ))}
    </div>
  );
}
