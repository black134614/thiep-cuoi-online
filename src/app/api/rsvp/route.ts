import { NextResponse } from "next/server";
import type { RsvpStatus } from "@/types/wedding";
import {
  findRsvpByGuestKey,
  loadRsvpResponses,
  upsertRsvp,
} from "@/lib/rsvpStore";

export const dynamic = "force-dynamic";

const VALID_STATUS = new Set<RsvpStatus>([
  "attending_1",
  "attending_2",
  "declined",
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guestId = searchParams.get("guestId") ?? undefined;
  const guestName = searchParams.get("guestName") ?? undefined;

  if (!guestId && !guestName) {
    return NextResponse.json({ error: "Thiếu thông tin khách." }, { status: 400 });
  }

  const responses = await loadRsvpResponses();
  const record = findRsvpByGuestKey(responses, guestId, guestName ?? undefined);

  return NextResponse.json({ rsvp: record });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { guestId?: string; guestName?: string; status?: string }
    | null;

  const guestName = body?.guestName?.trim();
  const status = body?.status as RsvpStatus | undefined;

  if (!guestName) {
    return NextResponse.json({ error: "Vui lòng có tên khách mời." }, { status: 400 });
  }
  if (!status || !VALID_STATUS.has(status)) {
    return NextResponse.json({ error: "Trạng thái không hợp lệ." }, { status: 400 });
  }

  try {
    const record = await upsertRsvp({
      guestId: body?.guestId?.trim() || undefined,
      guestName,
      status,
    });
    return NextResponse.json({ rsvp: record }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Không lưu được xác nhận." }, { status: 500 });
  }
}
