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
  readGuestNameFromUrl,
  writeGuestNameToStorage,
} from "@/lib/guestName";

interface GuestNameContextValue {
  guestName: string | null;
  setGuestName: (name: string) => void;
  clearGuestName: () => void;
  pickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
}

const GuestNameContext = createContext<GuestNameContextValue | null>(null);

export function GuestNameProvider({ children }: { children: React.ReactNode }) {
  const [guestName, setGuestNameState] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = readGuestNameFromUrl();
    const fromStorage = readGuestNameFromStorage();
    const initial = fromUrl ?? fromStorage;
    if (initial) {
      setGuestNameState(initial);
      writeGuestNameToStorage(initial);
    }
    setHydrated(true);
  }, []);

  const setGuestName = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setGuestNameState(trimmed);
    writeGuestNameToStorage(trimmed);
    setPickerOpen(false);
  }, []);

  const clearGuestName = useCallback(() => {
    setGuestNameState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("invitation-guest-name");
    }
  }, []);

  const openPicker = useCallback(() => setPickerOpen(true), []);
  const closePicker = useCallback(() => setPickerOpen(false), []);

  const value = useMemo(
    () => ({
      guestName,
      setGuestName,
      clearGuestName,
      pickerOpen,
      openPicker,
      closePicker,
    }),
    [guestName, setGuestName, clearGuestName, pickerOpen, openPicker, closePicker],
  );

  return (
    <GuestNameContext.Provider value={value}>
      {children}
      {hydrated ? null : null}
    </GuestNameContext.Provider>
  );
}

export function useGuestName() {
  const ctx = useContext(GuestNameContext);
  if (!ctx) {
    throw new Error("useGuestName must be used within GuestNameProvider");
  }
  return ctx;
}
