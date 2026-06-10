/** Gộp className có điều kiện (thay cho clsx để không cần thêm dependency). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** true nếu thời điểm mục tiêu đã qua */
  isPast: boolean;
}

/** Tính khoảng thời gian còn lại tới mốc target (ISO string). */
export function getCountdown(targetIso: string, now: Date = new Date()): CountdownParts {
  const target = new Date(targetIso).getTime();
  const diff = target - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isPast: false };
}

/** Sinh id ngẫu nhiên ngắn (dùng tạm cho wish khi chưa có backend). */
export function shortId(): string {
  return Math.random().toString(36).slice(2, 10);
}
