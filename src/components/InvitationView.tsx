"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/types/wedding";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { CoverScreen } from "@/components/sections/CoverScreen";
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

export function InvitationView({ data }: { data: WeddingData }) {
  const [opened, setOpened] = useState(false);
  const [coverVisible, setCoverVisible] = useState(true);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    document.body.style.overflow = coverVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [coverVisible]);

  const handleOpen = () => {
    setOpened(true);
    setMusicOn(true);
    setTimeout(() => setCoverVisible(false), 900);
  };

  return (
    <>
      {coverVisible && (
        <CoverScreen data={data} onOpen={handleOpen} isOpened={opened} />
      )}

      <main
        className={cn(
          "invitation-shell min-h-screen transition-opacity duration-700",
          opened ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
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

      {opened && data.theme.music && (
        <MusicToggle src={data.theme.music} autoPlay={musicOn} />
      )}
    </>
  );
}
