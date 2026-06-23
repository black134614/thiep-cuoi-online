"use client";

import { useMemo, useState } from "react";
import { guestList } from "@/data/guests";
import { useGuestName } from "@/components/GuestNameProvider";
import { cn } from "@/lib/utils";

export function GuestNamePicker() {
  const { pickerOpen, closePicker, setGuestName } = useGuestName();
  const [query, setQuery] = useState("");
  const [customName, setCustomName] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return guestList;
    return guestList.filter((name) => name.toLowerCase().includes(q));
  }, [query]);

  if (!pickerOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName.trim()) setGuestName(customName.trim());
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Chọn tên người nhận thiệp"
    >
      <div className="flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-cream-light shadow-2xl">
        <div className="border-b border-ink/10 px-5 py-4">
          <h2 className="font-serif text-lg font-semibold text-crimson">
            Bạn là ai?
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Chọn tên để thiệp hiển thị lời mời dành riêng cho bạn.
          </p>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm tên trong danh sách…"
            className="mt-3 w-full rounded-lg border border-gold/40 bg-white/60 px-3 py-2.5 text-sm outline-none focus:border-wine"
            autoFocus
          />
        </div>

        <ul className="flex-1 overflow-y-auto px-3 py-2">
          {filtered.length === 0 ? (
            <li className="px-2 py-6 text-center text-sm text-ink/50">
              Không tìm thấy. Nhập tên bên dưới.
            </li>
          ) : (
            filtered.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => setGuestName(name)}
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-ink transition hover:bg-wine/10 hover:text-crimson"
                >
                  {name}
                </button>
              </li>
            ))
          )}
        </ul>

        <form
          onSubmit={handleCustomSubmit}
          className="border-t border-ink/10 px-5 py-4"
        >
          <label className="block text-xs font-medium uppercase tracking-wide text-ink/50">
            Hoặc nhập tên khác
          </label>
          <div className="mt-2 flex gap-2">
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Tên của bạn"
              className="min-w-0 flex-1 rounded-lg border border-gold/40 bg-white/60 px-3 py-2 text-sm outline-none focus:border-wine"
            />
            <button
              type="submit"
              className="rounded-lg bg-wine px-4 py-2 font-serif text-sm text-cream-light"
            >
              Xác nhận
            </button>
          </div>
        </form>

        <div className="border-t border-ink/10 px-5 py-3 text-right">
          <button
            type="button"
            onClick={closePicker}
            className={cn(
              "text-sm text-ink/50 underline-offset-2 hover:text-crimson hover:underline",
            )}
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
}
