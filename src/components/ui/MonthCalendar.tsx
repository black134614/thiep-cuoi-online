"use client";

import { getDaysInMonth, getFirstDayOfMonth } from "@/lib/calendar";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

/** Lịch tháng với ngày cưới được đánh dấu trái tim */
export function MonthCalendar({
  year,
  month,
  highlightDay,
}: {
  year: number;
  month: number;
  highlightDay: number;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="mx-auto max-w-xs border border-ink/20 p-4">
      <p className="mb-3 text-center font-serif text-sm text-crimson">
        Tháng {month} / {year}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 font-medium text-ink/50">
            {d}
          </span>
        ))}
        {cells.map((day, i) => (
          <span
            key={i}
            className={`flex h-8 items-center justify-center rounded-full ${
              day === highlightDay
                ? "bg-wine text-cream-light"
                : day
                  ? "text-ink/70"
                  : ""
            }`}
          >
            {day === highlightDay ? (
              <span className="text-sm">♥</span>
            ) : (
              day
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
