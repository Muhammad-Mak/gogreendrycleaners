import Image from "next/image";
import { partners } from "@/data/partners";

/**
 * Continuous marquee that pauses on hover. The track is rendered twice
 * back-to-back so the animation can shift -50% and seamlessly loop.
 */
export function TrustStrip() {
  // Duplicate the list so a -50% translateX completes a seamless loop
  const looped = [...partners, ...partners];

  return (
    <section className="bg-warm-1 py-14 lg:py-16 border-y border-warm-2 overflow-hidden">
      <div className="container">
        <div className="text-center">
          <span className="section-label">Trusted Partners</span>
          <p className="mt-3 text-sm text-text-secondary">
            Garment care for Florida and the East Coast's most discerning hospitality, residential, and cultural institutions.
          </p>
        </div>
      </div>

      <div className="mt-10 marquee-pause edge-fade-x">
        <div className="marquee-track flex items-center gap-12 lg:gap-16 w-max">
          {looped.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="relative h-12 w-32 sm:w-40 flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={p.logo}
                alt={p.name}
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
