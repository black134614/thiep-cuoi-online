import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import {
  guestsToInvites,
  loadGuests,
  nextGuestSlot,
  saveGuests,
} from "@/lib/guestStore";
import { getSiteBaseUrl } from "@/lib/guestInvite";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const guests = await loadGuests();
  const siteUrl = getSiteBaseUrl();
  const invites = guestsToInvites(guests, siteUrl);

  return NextResponse.json({
    guests: invites,
    siteUrl,
    storage: process.env.BLOB_READ_WRITE_TOKEN ? "blob" : "file",
  });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const body = (await request.json().catch(() => null)) as
    | { name?: string }
    | null;

  const name = body?.name?.trim();
  if (!name) {
    return NextResponse.json({ error: "Vui lòng nhập tên khách." }, { status: 400 });
  }

  const guests = await loadGuests();
  const duplicate = guests.some(
    (g) => g.name.toLowerCase() === name.toLowerCase(),
  );
  if (duplicate) {
    return NextResponse.json({ error: "Tên khách đã tồn tại." }, { status: 409 });
  }

  const record = nextGuestSlot(guests, name);
  const next = [...guests, record];
  await saveGuests(next);

  const siteUrl = getSiteBaseUrl();
  const [invite] = guestsToInvites([record], siteUrl);

  return NextResponse.json({ guest: invite }, { status: 201 });
}
