import { Container } from "@/components/ui/Container";
import { SectionBand } from "@/components/ui/SectionBand";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import type { SectionProps } from "@/types/wedding";

export function Venue({ data, className }: SectionProps) {
  const { reception } = data;
  const { coordinates } = reception;

  const mapEmbedUrl = coordinates
    ? `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`
    : reception.mapUrl
      ? `https://maps.google.com/maps?q=${encodeURIComponent(reception.address ?? reception.venueName)}&z=15&output=embed`
      : null;

  return (
    <section className={`section-cream py-0 ${className ?? ""}`}>
      <SectionBand title="Tiệc cưới sẽ tổ chức tại" />
      <Container className="py-10 text-center sm:py-14">
        <RevealOnScroll>
          <p className="font-serif text-sm leading-relaxed text-crimson">
            {reception.address}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          {mapEmbedUrl && (
            <div className="mt-6 overflow-hidden rounded-lg border border-ink/10 shadow-md">
              <iframe
                src={mapEmbedUrl}
                title="Bản đồ địa điểm tiệc cưới"
                className="aspect-video w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          )}
        </RevealOnScroll>

        {reception.mapUrl && (
          <RevealOnScroll delay={200}>
            <a
              href={reception.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block"
            >
              <Button>Chỉ đường</Button>
            </a>
          </RevealOnScroll>
        )}
      </Container>
    </section>
  );
}
