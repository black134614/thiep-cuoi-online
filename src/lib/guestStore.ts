import path from "path";
import { buildGuestInviteId } from "@/lib/guestInvite";
import {
  BlobNotConfiguredError,
  PersistWriteError,
  loadJsonStore,
  saveJsonStore,
} from "@/lib/jsonPersist";
import { guestList as SEED_NAMES } from "@/data/guests";

const BLOB_PATHNAME = "wedding-guests.json";
const LOCAL_PATH = path.join(process.cwd(), "data", "guests.json");

export interface GuestRecord {
  id: string;
  name: string;
  order: number;
}

interface GuestStoreFile {
  guests: GuestRecord[];
}

export { BlobNotConfiguredError, PersistWriteError };

function normalizeName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}

function buildSeedGuests(): GuestRecord[] {
  return SEED_NAMES.map((name, i) => ({
    id: buildGuestInviteId(name, i + 1),
    name: normalizeName(name),
    order: i + 1,
  }));
}

function sortGuests(guests: GuestRecord[]): GuestRecord[] {
  return [...guests].sort((a, b) => a.order - b.order);
}

export async function loadGuests(): Promise<GuestRecord[]> {
  const data = await loadJsonStore<GuestStoreFile>(BLOB_PATHNAME, LOCAL_PATH);

  if (data?.guests?.length) {
    return sortGuests(data.guests);
  }

  const seed = buildSeedGuests();
  try {
    await saveJsonStore(BLOB_PATHNAME, LOCAL_PATH, { guests: seed });
  } catch {
    // Seed vẫn trả về để đọc; ghi sẽ báo lỗi khi admin thao tác
  }
  return seed;
}

export async function saveGuests(guests: GuestRecord[]): Promise<"blob" | "file"> {
  const sorted = sortGuests(guests);
  return saveJsonStore(BLOB_PATHNAME, LOCAL_PATH, { guests: sorted });
}

export function resolveGuestFromList(
  guests: GuestRecord[],
  id: string,
): GuestRecord | null {
  const key = id.trim().toLowerCase();
  return guests.find((g) => g.id.toLowerCase() === key) ?? null;
}

export function nextGuestSlot(
  guests: GuestRecord[],
  name: string,
): GuestRecord {
  const normalized = normalizeName(name);
  const maxOrder = guests.reduce((max, g) => Math.max(max, g.order), 0);
  const order = maxOrder + 1;
  let id = buildGuestInviteId(normalized, order);
  let suffix = order;
  while (guests.some((g) => g.id.toLowerCase() === id.toLowerCase())) {
    suffix += 1;
    id = buildGuestInviteId(normalized, suffix);
  }
  return { id, name: normalized, order };
}

export function guestsToInvites(
  guests: GuestRecord[],
  baseUrl: string,
): Array<GuestRecord & { url: string; index: number }> {
  return sortGuests(guests).map((g, i) => ({
    ...g,
    index: i + 1,
    url: `${baseUrl}/?id=${encodeURIComponent(g.id)}`,
  }));
}
