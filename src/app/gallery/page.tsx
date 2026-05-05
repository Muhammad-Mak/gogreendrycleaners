import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look inside GoGreen Dry Cleaners — our storefronts, our process, and our team.",
  alternates: { canonical: "/gallery" },
};

const IMAGES: { src: string; alt: string }[] = [
  { src: "/images/topics/dry-cleaning-rack.jpg",   alt: "Eco-friendly dry cleaning at GoGreen — racks of plastic-wrapped shirts" },
  { src: "/images/topics/bridal.jpg",              alt: "Bridal gown preservation at GoGreen Dry Cleaners" },
  { src: "/images/services/geotagged-1.jpg",       alt: "Inside a GoGreen Dry Cleaners storefront in Florida" },
  { src: "/images/topics/suits.jpg",               alt: "Concierge dry cleaning service for business attire" },
  { src: "/images/services/geotagged-3.jpg",       alt: "GoGreen Dry Cleaners — process area and equipment" },
  { src: "/images/topics/alterations.jpg",         alt: "Expert alterations and tailoring at GoGreen" },
  { src: "/images/services/geotagged-2.jpg",       alt: "GoGreen Dry Cleaners storefront interior" },
  { src: "/images/topics/personal-shopper.jpg",    alt: "Personalized garment care service at GoGreen" },
  { src: "/images/services/geotagged-4.jpg",       alt: "GoGreen Dry Cleaners — service counter" },
  { src: "/images/topics/dress-fitting.jpg",       alt: "Eco-friendly garment care for dresses at GoGreen" },
  { src: "/images/services/geotagged-5.jpg",       alt: "GoGreen Dry Cleaners — interior detail" },
  { src: "/images/services/geotagged-6.jpg",       alt: "GoGreen Dry Cleaners — process room" },
  { src: "/images/services/geotagged-7.jpg",       alt: "GoGreen Dry Cleaners — finishing area" },
  { src: "/images/topics/eco-questioning.jpg",     alt: "Choosing eco-friendly garment care over traditional dry cleaning" },
  { src: "/images/topics/laundry-couple.jpg",      alt: "Couple discussing the difference between eco and traditional dry cleaning" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            A look inside <span className="accent-text text-accent-light">our world</span>.
          </>
        }
        description="Storefronts, process, and the people behind the work."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-24">
        <div className="container">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 [&>*]:break-inside-avoid">
            {IMAGES.map((item, i) => (
              <div
                key={item.src}
                className="img-zoom rounded-2xl overflow-hidden shadow-md mb-4 lg:mb-6"
              >
                <div className={`relative w-full ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
