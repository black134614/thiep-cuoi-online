import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import {
  guestsToInvites,
  loadGuests,
  resolveGuestFromList,
  saveGuests,
} from "@/lib/guestStore";
import { getSiteBaseUrl } from "@/lib/guestInvite";

export const dynamic = "force-dynamic";

type RouteContext = { params: { id: string } };

export async function PATCH(request: Request, { params }: RouteContext) {
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
  const target = resolveGuestFromList(guests, params.id);
  if (!target) {
    return NextResponse.json({ error: "Không tìm thấy khách." }, { status: 404 });
  }

  const duplicate = guests.some(
    (g) =>
      g.id !== target.id && g.name.toLowerCase() === name.toLowerCase(),
  );
  if (duplicate) {
    return NextResponse.json({ error: "Tên khách đã tồn tại." }, { status: 409 });
  }

  const next = guests.map((g) =>
    g.id === target.id ? { ...g, name } : g,
  );
  await saveGuests(next);

  const siteUrl = getSiteBaseUrl();
  const [invite] = guestsToInvites(
    next.filter((g) => g.id === target.id),
    siteUrl,
  );

  return NextResponse.json({ guest: invite });
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const guests = await loadGuests();
  const target = resolveGuestFromList(guests, params.id);
  if (!target) {
    return NextResponse.json({ error: "Không tìm thấy khách." }, { status: 404 });
  }

  const next = guests.filter((g) => g.id !== target.id);
  await saveGuests(next);

  return NextResponse.json({ ok: true });
}
