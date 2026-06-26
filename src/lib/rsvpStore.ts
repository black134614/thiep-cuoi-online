import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { head, put } from "@vercel/blob";
import type { RsvpRecord, RsvpStatus } from "@/types/wedding";
import { shortId } from "@/lib/utils";

const BLOB_PATHNAME = "wedding-rsvp.json";
const LOCAL_PATH = path.join(process.cwd(), "data", "rsvp.json");

interface RsvpStoreFile {
  responses: RsvpRecord[];
}

async function readFromBlob(): Promise<RsvpRecord[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const meta = await head(BLOB_PATHNAME);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as RsvpStoreFile;
    return data.responses ?? null;
  } catch {
    return null;
  }
}

async function writeToBlob(responses: RsvpRecord[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify({ responses }, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

function readFromFile(): RsvpRecord[] | null {
  try {
    if (!existsSync(LOCAL_PATH)) return null;
    const data = JSON.parse(readFileSync(LOCAL_PATH, "utf-8")) as RsvpStoreFile;
    return data.responses ?? null;
  } catch {
    return null;
  }
}

function writeToFile(responses: RsvpRecord[]): void {
  const dir = path.dirname(LOCAL_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(LOCAL_PATH, JSON.stringify({ responses }, null, 2), "utf-8");
}

export async function loadRsvpResponses(): Promise<RsvpRecord[]> {
  const fromBlob = await readFromBlob();
  if (fromBlob) return fromBlob;

  const fromFile = readFromFile();
  if (fromFile) return fromFile;

  return [];
}

export async function saveRsvpResponses(responses: RsvpRecord[]): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeToBlob(responses);
  }
  try {
    writeToFile(responses);
  } catch {
    // Read-only filesystem on Vercel
  }
}

export function headcountForStatus(status: RsvpStatus): number {
  if (status === "attending_1") return 1;
  if (status === "attending_2") return 2;
  return 0;
}

export function rsvpStatusLabel(status: RsvpStatus): string {
  switch (status) {
    case "attending_1":
      return "Tham dự (1 người)";
    case "attending_2":
      return "Tham dự (2 người)";
    case "declined":
      return "Từ chối";
  }
}

export function findRsvpByGuestKey(
  responses: RsvpRecord[],
  guestId?: string,
  guestName?: string,
): RsvpRecord | null {
  if (guestId) {
    const byId = responses.find(
      (r) => r.guestId?.toLowerCase() === guestId.toLowerCase(),
    );
    if (byId) return byId;
  }
  if (guestName) {
    const key = guestName.toLowerCase();
    return responses.find((r) => r.guestName.toLowerCase() === key) ?? null;
  }
  return null;
}

export async function upsertRsvp(input: {
  guestId?: string;
  guestName: string;
  status: RsvpStatus;
}): Promise<RsvpRecord> {
  const name = input.guestName.replace(/\s+/g, " ").trim();
  if (!name) throw new Error("MISSING_NAME");

  const responses = await loadRsvpResponses();
  const now = new Date().toISOString();
  const existing = findRsvpByGuestKey(responses, input.guestId, name);

  const record: RsvpRecord = {
    id: existing?.id ?? shortId(),
    guestId: input.guestId || existing?.guestId,
    guestName: name,
    status: input.status,
    headcount: headcountForStatus(input.status),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  const next = existing
    ? responses.map((r) => (r.id === existing.id ? record : r))
    : [record, ...responses];

  await saveRsvpResponses(next);
  return record;
}
