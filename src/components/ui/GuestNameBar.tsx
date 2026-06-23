"use client";

import { useGuestName } from "@/components/GuestNameProvider";

export function GuestNameBar() {
  const { guestName, openPicker } = useGuestName();

  if (!guestName) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 mx-auto max-w-[640px]">
      <div className="flex items-center justify-between gap-3 bg-wine/95 px-4 py-2.5 text-cream-light shadow-md backdrop-blur-sm">
        <p className="min-w-0 truncate font-serif text-sm">
          Kính mời: <span className="font-semibold">{guestName}</span>
        </p>
        <button
          type="button"
          onClick={openPicker}
          className="shrink-0 rounded-full border border-cream-light/40 px-3 py-1 text-xs uppercase tracking-wide transition hover:bg-cream-light/15"
        >
          Đổi
        </button>
      </div>
    </div>
  );
}
