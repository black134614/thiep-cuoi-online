const STORAGE_KEY = "invitation-guest-name";
const GUEST_ID_KEY = "invitation-guest-id";

export function normalizeGuestName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}

export function readGuestNameFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(STORAGE_KEY);
  return value ? normalizeGuestName(value) : null;
}

export function writeGuestNameToStorage(name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, normalizeGuestName(name));
}

export function readGuestIdFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(GUEST_ID_KEY);
}

export function writeGuestIdToStorage(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GUEST_ID_KEY, id);
}

export function readGuestIdFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("id");
}

export function clearGuestNameStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(GUEST_ID_KEY);
}
