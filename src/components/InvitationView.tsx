"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/types/wedding";
import { GuestNameProvider, useGuestName } from "@/components/GuestNameProvider";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { GuestNamePicker } from "@/components/ui/GuestNamePicker";
import { GuestNameBar } from "@/components/ui/GuestNameBar";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { CoverScreen } from "@/components/sections/CoverScreen";
import { WelcomeHero } from "@/components/sections/WelcomeHero";
import { WeddingInfo } from "@/components/sections/WeddingInfo";
import { Gallery } from "@/components/sections/Gallery";
import { ReceptionInfo } from "@/components/sections/ReceptionInfo";
import { Countdown } from "@/components/sections/Countdown";
import { Venue } from "@/components/sections/Venue";
import { Timeline } from "@/components/sections/Timeline";
import { Guestbook } from "@/components/sections/Guestbook";
import { GiftEnvelope } from "@/components/sections/GiftEnvelope";
import { Footer } from "@/components/sections/Footer";
import { cn } from "@/lib/utils";

type Phase = "loading" | "cover" | "opening" | "content";

const LOADING_MS = 2400;
const OPEN_REVEAL_MS = 900;
const COVER_UNMOUNT_MS = 1800;

function InvitationViewInner({ data }: { data: WeddingData }) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [loadingExiting, setLoadingExiting] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const { guestName, openPicker } = useGuestName();

  useEffect(() => {
    const exitTimer = setTimeout(() => setLoadingExiting(true), LOADING_MS - 600);
    const coverTimer = setTimeout(() => setPhase("cover"), LOADING_MS);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(coverTimer);
    };
  }, []);

  useEffect(() => {
    const locked = phase !== "content";
    document.body.style.overflow = locked ? "hidden" : "";
    document.body.classList.toggle("invitation-locked", locked);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("invitation-locked");
    };
  }, [phase]);

  const [coverMounted, setCoverMounted] = useState(false);

  useEffect(() => {
    if (phase === "cover") setCoverMounted(true);
  }, [phase]);

  useEffect(() => {
    if (phase !== "content") return;
    const t = setTimeout(() => setCoverMounted(false), COVER_UNMOUNT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "content" && !guestName) {
      openPicker();
    }
  }, [phase, guestName, openPicker]);

  const handleOpen = () => {
    if (phase !== "cover") return;
    setPhase("opening");
    setMusicOn(true);
    setTimeout(() => setPhase("content"), OPEN_REVEAL_MS);
  };

  const isCoverExiting = phase === "opening" || phase === "content";

  return (
    <>
      {phase === "loading" && (
        <LoadingScreen data={data} exiting={loadingExiting} />
      )}

      {coverMounted && (
        <CoverScreen
          data={data}
          onOpen={handleOpen}
          isOpening={isCoverExiting}
        />
      )}

      {phase === "content" && <GuestNameBar />}

      <main
        className={cn(
          "invitation-shell min-h-screen",
          phase === "content" && guestName && "pt-11",
          phase === "content"
            ? "animate-reveal-shell"
            : "invisible fixed inset-0 opacity-0",
        )}
        aria-hidden={phase !== "content"}
      >
        <WelcomeHero data={data} />
        <WeddingInfo data={data} />
        <Gallery data={data} />
        <ReceptionInfo data={data} />
        <Countdown data={data} />
        <Venue data={data} />
        <Timeline data={data} />
        <Guestbook data={data} />
        <GiftEnvelope data={data} />
        <Footer data={data} />
      </main>

      <GuestNamePicker />

      {phase === "content" && data.theme.music && (
        <MusicToggle src={data.theme.music} autoPlay={musicOn} />
      )}
    </>
  );
}

export function InvitationView({ data }: { data: WeddingData }) {
  return (
    <GuestNameProvider>
      <InvitationViewInner data={data} />
    </GuestNameProvider>
  );
}
