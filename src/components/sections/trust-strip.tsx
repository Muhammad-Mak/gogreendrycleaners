import Image from "next/image";
import { partners } from "@/data/partners";

export function TrustStrip() {
  return (
    <section className="bg-warm-1 py-12 lg:py-16 border-y border-warm-2">
      <div className="container">
        <div className="text-center">
          <span className="section-label">Trusted Partners</span>
          <p className="mt-3 text-sm text-text-secondary">
            Garment care for Florida and the East Coast's most discerning hospitality, residential, and cultural institutions.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-10 items-center">
          {partners.map((p) => (
            <div
              key={p.name}
              className="relative h-12 w-full opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
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
