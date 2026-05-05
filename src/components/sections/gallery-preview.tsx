import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const GALLERY = [
  "/images/services/geotagged-1.jpg",
  "/images/services/geotagged-3.jpg",
  "/images/about/storefront-1.jpg",
  "/images/services/geotagged-5.jpg",
  "/images/services/geotagged-6.jpg",
  "/images/services/geotagged-7.jpg",
  "/images/services/geotagged-2.jpg",
  "/images/services/geotagged-4.jpg",
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4" data-animate>
          {GALLERY.slice(0, 8).map((src, i) => (
            <div
              key={src}
              className={`img-zoom rounded-2xl overflow-hidden shadow-md ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`GoGreen storefront photo ${i + 1}`}
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
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
