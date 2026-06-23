import { NextResponse } from "next/server";
import type { Wish } from "@/types/wedding";
import { shortId } from "@/lib/utils";

const wishes: Wish[] = [];

export async function GET() {
  return NextResponse.json({ wishes });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { name?: string; message?: string; invitedAs?: string }
    | null;

  if (!body?.name?.trim() || !body?.message?.trim()) {
    return NextResponse.json(
      { error: "Vui lòng nhập tên và lời chúc." },
      { status: 400 },
    );
  }

  const wish: Wish = {
    id: shortId(),
    name: body.name.trim(),
    message: body.message.trim(),
    invitedAs: body.invitedAs?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
  wishes.unshift(wish);

  return NextResponse.json({ wish }, { status: 201 });
}
