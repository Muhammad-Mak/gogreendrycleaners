import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look inside GoGreen Dry Cleaners — our storefronts, our process, and our team.",
  alternates: { canonical: "/gallery" },
};

const IMAGES = [
  "/images/services/geotagged-1.jpg",
  "/images/services/geotagged-2.jpg",
  "/images/services/geotagged-3.jpg",
  "/images/services/geotagged-4.jpg",
  "/images/services/geotagged-5.jpg",
  "/images/services/geotagged-6.jpg",
  "/images/services/geotagged-7.jpg",
  "/images/about/storefront-1.jpg",
  "/images/about/team-1.jpeg",
  "/images/about/team-2.jpeg",
  "/images/about/team-3.jpeg",
  "/images/about/collage.png",
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
            {IMAGES.map((src, i) => (
              <div
                key={src}
                className="img-zoom rounded-2xl overflow-hidden shadow-md mb-4 lg:mb-6"
              >
                <div className={`relative w-full ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                  <Image
                    src={src}
                    alt={`GoGreen gallery photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
