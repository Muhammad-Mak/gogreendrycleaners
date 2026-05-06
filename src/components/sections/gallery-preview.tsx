import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 12-col asymmetric editorial grid on desktop (collapses to 2-col on
 * mobile/tablet). Two tall portraits anchor the layout; the rest sit
 * as short rectangular tiles that read as supporting frames.
 *
 *   Row 1-2: [bridal 7×2 (tall)] [rack 5×1] [suits 5×1]
 *   Row 3-4: [geo-2 5×1] [geo-5 7×2 (tall)] [geo-7 5×1]
 */
// On mobile/tablet (<lg) every tile uses the same aspect-square so the
// 2-col grid never gets a row sized by the taller of two mismatched
// cells (which left visible white space beneath shorter neighbours).
// Desktop layout still uses the asymmetric span pattern.
const GALLERY: { src: string; alt: string; desktop: string }[] = [
  { src: "/images/topics/bridal.jpg",              alt: "Bridal gown preservation by GoGreen — bride with cleaned wedding dress", desktop: "lg:col-span-7 lg:row-span-2" },
  { src: "/images/topics/dry-cleaning-rack.jpg",   alt: "Eco-friendly dry cleaning at GoGreen — racks of plastic-wrapped, freshly cleaned shirts", desktop: "lg:col-span-5 lg:row-span-1" },
  { src: "/images/topics/suits.jpg",               alt: "Concierge dry cleaning at GoGreen — counter handoff of a freshly cleaned suit", desktop: "lg:col-span-5 lg:row-span-1" },
  { src: "/images/services/geotagged-2.jpg",       alt: "Inside a GoGreen Dry Cleaners storefront — interior detail", desktop: "lg:col-span-5 lg:row-span-1" },
  { src: "/images/services/geotagged-5.jpg",       alt: "Inside a GoGreen Dry Cleaners storefront — process area", desktop: "lg:col-span-7 lg:row-span-2" },
  { src: "/images/services/geotagged-7.jpg",       alt: "Inside a GoGreen Dry Cleaners storefront — service counter", desktop: "lg:col-span-5 lg:row-span-1" },
];

export function GalleryPreview() {
  return (
    <section className="bg-bg py-20 lg:py-28">
      {/* Header in container for typographic rhythm */}
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="section-label">Inside Our Stores</span>
            <div className="section-divider-left" aria-hidden />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text leading-tight text-balance">
              Built like the boutique <span className="accent-text text-accent">your closet deserves</span>.
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent hover:text-accent-dark transition-colors"
          >
            View full gallery <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 12-col asymmetric grid on desktop — two tall portraits anchor
          the layout, surrounded by horizontal supporting tiles. Sharp
          rectangular corners, small gaps, small lateral margin. */}
      <div
        className="px-3 lg:px-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-3 lg:auto-rows-[280px]"
        data-animate
      >
        {GALLERY.map((item) => (
          <div
            key={item.src}
            className={cn(
              "img-zoom !rounded-none overflow-hidden lg:h-full",
              "aspect-square lg:aspect-auto",
              item.desktop
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 50vw"
                quality={95}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
