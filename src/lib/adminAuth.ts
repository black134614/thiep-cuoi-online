export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "cuoi2026";
}

export function isValidAdminKey(key: string | undefined | null): boolean {
  if (!key) return false;
  return key === getAdminPassword();
}
