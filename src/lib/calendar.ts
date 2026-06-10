import type { WeddingDate } from "@/types/wedding";

/** Sinh nội dung file .ics để thêm vào lịch */
export function generateIcs(
  title: string,
  date: WeddingDate,
  location?: string,
): string {
  const start = new Date(date.iso);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    location ? `LOCATION:${location}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

/** Tải file .ics */
export function downloadIcs(ics: string, filename: string) {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Lấy số ngày trong tháng */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Ngày đầu tuần của tháng (0=CN, 1=T2...) */
export function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1; // T2=0 ... CN=6
}
