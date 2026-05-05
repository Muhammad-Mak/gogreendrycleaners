import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { services } from "@/data/services";

const FEATURED_SLUGS = ["bridal", "restoration", "alterations", "household"];

export function FeaturedItems() {
  const items = FEATURED_SLUGS.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);

  return (
    <section className="bg-warm-1 py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          label="Featured Care"
          title={
            <>
              The pieces that <span className="accent-text text-accent">matter most</span>.
            </>
          }
          description="Specialty work for the garments you can't replace — and the ones that have to look perfect by Saturday."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-animate>
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] img-zoom rounded-2xl overflow-hidden shadow-md">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-accent-light">
                    {item.tagline}
                  </div>
                  <div className="font-serif text-xl mt-2">{item.shortTitle}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
