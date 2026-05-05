import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const GALLERY: { src: string; alt: string }[] = [
  { src: "/images/topics/dry-cleaning-rack.jpg",   alt: "Eco-friendly dry cleaning at GoGreen — racks of plastic-wrapped, freshly cleaned shirts" },
  { src: "/images/topics/bridal.jpg",              alt: "Bridal gown preservation by GoGreen — bride with cleaned wedding dress" },
  { src: "/images/topics/suits.jpg",               alt: "Concierge dry cleaning at GoGreen — counter handoff of a freshly cleaned suit" },
  { src: "/images/services/geotagged-2.jpg",       alt: "Inside a GoGreen Dry Cleaners storefront — interior detail" },
  { src: "/images/services/geotagged-5.jpg",       alt: "Inside a GoGreen Dry Cleaners storefront — process area" },
  { src: "/images/services/geotagged-7.jpg",       alt: "Inside a GoGreen Dry Cleaners storefront — service counter" },
];

export function GalleryPreview() {
  return (
    <section className="bg-bg py-20 lg:py-28">
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-5" data-animate>
          {GALLERY.map((item) => (
            <div
              key={item.src}
              className="img-zoom rounded-2xl overflow-hidden shadow-md aspect-[3/2]"
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
