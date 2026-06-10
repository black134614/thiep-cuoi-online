"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Hiệu ứng xuất hiện khi cuộn tới (fade-up) */
export function RevealOnScroll({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(visible ? "reveal-show" : "reveal-hidden", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
