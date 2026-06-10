import { NextResponse } from "next/server";
import type { Wish } from "@/types/wedding";
import { shortId } from "@/lib/utils";

/**
 * API Sổ lưu bút (Guestbook).
 *
 * HIỆN TẠI: lưu tạm trong bộ nhớ (mất khi restart server). Đủ để dev UI.
 *
 * TODO(agent-backend):
 *   [ ] Thay store in-memory bằng DB thật (Prisma + SQLite/Postgres, Supabase, ...)
 *   [ ] Validate & chống spam (rate limit, độ dài, lọc bậy)
 *   [ ] Phân trang khi danh sách lớn
 */

// Store tạm trong RAM
const wishes: Wish[] = [];

export async function GET() {
  return NextResponse.json({ wishes });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { name?: string; message?: string }
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
    createdAt: new Date().toISOString(),
  };
  wishes.unshift(wish);

  return NextResponse.json({ wish }, { status: 201 });
}
