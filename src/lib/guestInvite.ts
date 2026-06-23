export interface GuestInvite {
  id: string;
  name: string;
  index: number;
}

export function slugifyGuestName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildGuestInviteId(name: string, index: number): string {
  return `${slugifyGuestName(name)}-${index}`;
}

const PRODUCTION_SITE_URL = "https://thiep-cuoi-online-beige.vercel.app";

export function getSiteBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function buildInviteUrl(baseUrl: string, id: string): string {
  return `${baseUrl}/?id=${encodeURIComponent(id)}`;
}
