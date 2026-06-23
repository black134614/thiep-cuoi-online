"use client";

import { useState } from "react";

export function AdminLogin({
  onLogin,
}: {
  onLogin: (password: string) => Promise<string | null>;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }
    setLoading(true);
    setError("");
    const err = await onLogin(password.trim());
    if (err) setError(err);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e8dfd0] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-gold/30 bg-cream-light p-8 shadow-lg"
      >
        <h1 className="font-serif text-xl font-semibold text-crimson">
          Admin — Quản lý khách mời
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Thêm, sửa, xóa khách và copy link mời riêng cho từng người.
        </p>
        <label className="mt-6 block text-xs font-medium uppercase tracking-wide text-ink/50">
          Mật khẩu
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gold/40 bg-white/70 px-3 py-2.5 text-sm outline-none focus:border-wine"
          autoFocus
          disabled={loading}
        />
        {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-wine py-2.5 font-serif text-sm text-cream-light transition hover:bg-wine-dark disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập…" : "Vào trang admin"}
        </button>
        <p className="mt-4 text-center text-xs text-ink/40">
          Mật khẩu mặc định: cuoi2026 (đổi qua biến ADMIN_PASSWORD trên Vercel)
        </p>
      </form>
    </div>
  );
}
