import { NextResponse } from "next/server";
import { isValidAdminKey } from "@/lib/adminAuth";

export function requireAdmin(request: Request): NextResponse | null {
  const key = request.headers.get("x-admin-key");
  if (!isValidAdminKey(key)) {
    return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 401 });
  }
  return null;
}
