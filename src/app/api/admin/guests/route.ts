import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import {
  guestsToInvites,
  loadGuests,
  nextGuestSlot,
  saveGuests,
} from "@/lib/guestStore";
import { getSiteBaseUrl } from "@/lib/guestInvite";
import { getStorageMode, toPersistErrorResponse } from "@/lib/jsonPersist";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;

    const guests = await loadGuests();
    const siteUrl = getSiteBaseUrl();
    const invites = guestsToInvites(guests, siteUrl);
    const storage = getStorageMode();

    return NextResponse.json({
      guests: invites,
      siteUrl,
      storage,
      writable: storage !== "readonly",
      hasBlobToken: storage === "blob",
    });
  } catch (err) {
    console.error("[GET /api/admin/guests]", err);
    const { status, error } = toPersistErrorResponse(err);
    return NextResponse.json({ error }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;

    const body = (await request.json().catch(() => null)) as
      | { name?: string }
      | null;

    const name = body?.name?.trim();
    if (!name) {
      return NextResponse.json(
        { error: "Vui lòng nhập tên khách." },
        { status: 400 },
      );
    }

    const guests = await loadGuests();
    const duplicate = guests.some(
      (g) => g.name.toLowerCase() === name.toLowerCase(),
    );
    if (duplicate) {
      return NextResponse.json(
        { error: "Tên khách đã tồn tại." },
        { status: 409 },
      );
    }

    const record = nextGuestSlot(guests, name);
    const next = [...guests, record];
    await saveGuests(next);

    const siteUrl = getSiteBaseUrl();
    const [invite] = guestsToInvites([record], siteUrl);

    return NextResponse.json({ guest: invite }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/guests]", err);
    const { status, error } = toPersistErrorResponse(err);
    return NextResponse.json({ error }, { status });
  }
}
