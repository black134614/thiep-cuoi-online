const STORAGE_KEY = "invitation-guest-name";

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

export function clearGuestNameStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function readGuestNameFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const param = new URLSearchParams(window.location.search).get("to");
  return param ? normalizeGuestName(decodeURIComponent(param)) : null;
}
