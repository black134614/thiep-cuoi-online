import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { head, put } from "@vercel/blob";
import { buildGuestInviteId } from "@/lib/guestInvite";
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

async function readFromBlob(): Promise<GuestRecord[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const meta = await head(BLOB_PATHNAME);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as GuestStoreFile;
    return data.guests?.length ? sortGuests(data.guests) : null;
  } catch {
    return null;
  }
}

async function writeToBlob(guests: GuestRecord[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify({ guests }, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

function readFromFile(): GuestRecord[] | null {
  try {
    if (!existsSync(LOCAL_PATH)) return null;
    const data = JSON.parse(readFileSync(LOCAL_PATH, "utf-8")) as GuestStoreFile;
    return data.guests?.length ? sortGuests(data.guests) : null;
  } catch {
    return null;
  }
}

function writeToFile(guests: GuestRecord[]): void {
  const dir = path.dirname(LOCAL_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(LOCAL_PATH, JSON.stringify({ guests }, null, 2), "utf-8");
}

export async function loadGuests(): Promise<GuestRecord[]> {
  const fromBlob = await readFromBlob();
  if (fromBlob?.length) return fromBlob;

  const fromFile = readFromFile();
  if (fromFile?.length) return fromFile;

  const seed = buildSeedGuests();
  await saveGuests(seed);
  return seed;
}

export async function saveGuests(guests: GuestRecord[]): Promise<void> {
  const sorted = sortGuests(guests);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeToBlob(sorted);
  }

  try {
    writeToFile(sorted);
  } catch {
    // Read-only filesystem (e.g. Vercel without local write)
  }
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
