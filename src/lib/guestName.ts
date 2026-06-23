export function normalizeGuestName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}

export function readGuestNameFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem("invitation-guest-name");
  return value ? normalizeGuestName(value) : null;
}

export function writeGuestNameToStorage(name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("invitation-guest-name", normalizeGuestName(name));
}

export function clearGuestNameStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("invitation-guest-name");
}
