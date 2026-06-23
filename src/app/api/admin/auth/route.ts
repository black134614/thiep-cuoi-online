import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { password?: string }
    | null;

  if (!body?.password || body.password !== getAdminPassword()) {
    return NextResponse.json({ error: "Sai mật khẩu." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
