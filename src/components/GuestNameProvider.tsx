"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  readGuestNameFromStorage,
  writeGuestNameToStorage,
} from "@/lib/guestName";

interface GuestNameContextValue {
  guestName: string | null;
  setGuestName: (name: string) => void;
  clearGuestName: () => void;
}

const GuestNameContext = createContext<GuestNameContextValue | null>(null);

async function resolveGuestFromUrl(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");
  if (id) {
    try {
      const res = await fetch(
        `/api/guests/resolve?id=${encodeURIComponent(id)}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        const data = (await res.json()) as { name?: string };
        return data.name?.trim() || null;
      }
    } catch {
      return null;
    }
    return null;
  }

  const to = params.get("to");
  if (to) return decodeURIComponent(to).replace(/\s+/g, " ").trim();

  return null;
}

export function GuestNameProvider({ children }: { children: React.ReactNode }) {
  const [guestName, setGuestNameState] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const fromUrl = await resolveGuestFromUrl();
      const fromStorage = readGuestNameFromStorage();
      const initial = fromUrl ?? fromStorage;
      if (!cancelled && initial) {
        setGuestNameState(initial);
        writeGuestNameToStorage(initial);
      }
    };

    void init();
    return () => {
      cancelled = true;
    };
  }, []);

  const setGuestName = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setGuestNameState(trimmed);
    writeGuestNameToStorage(trimmed);
  }, []);

  const clearGuestName = useCallback(() => {
    setGuestNameState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("invitation-guest-name");
    }
  }, []);

  const value = useMemo(
    () => ({
      guestName,
      setGuestName,
      clearGuestName,
    }),
    [guestName, setGuestName, clearGuestName],
  );

  return (
    <GuestNameContext.Provider value={value}>{children}</GuestNameContext.Provider>
  );
}

export function useGuestName() {
  const ctx = useContext(GuestNameContext);
  if (!ctx) {
    throw new Error("useGuestName must be used within GuestNameProvider");
  }
  return ctx;
}
