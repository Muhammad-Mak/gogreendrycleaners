import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Editorial asymmetric layout (Madame Paulette style):
 *
 *   Row 1: [   bridal 6×2 (tall)  ] [ alterations 6×1 ]
 *   Row 2: [   bridal continues   ] [ restoration 6×1 ]
 *   Row 3: [        household 12×1 (wide banner)      ]
 *
 * 12-col grid on desktop; rows are 300px tall so the tall portrait reads
 * as portrait (~600px), the side rectangles read as horizontal tiles,
 * and the bottom banner spans the full row.
 */
const FEATURED = [
  { slug: "bridal",      desktop: "lg:col-span-6 lg:row-span-2", tablet: "md:col-span-2", mobileAspect: "aspect-[4/5]" },
  { slug: "alterations", desktop: "lg:col-span-6 lg:row-span-1", tablet: "",              mobileAspect: "aspect-[5/4]" },
  { slug: "restoration", desktop: "lg:col-span-6 lg:row-span-1", tablet: "",              mobileAspect: "aspect-[5/4]" },
  { slug: "household",   desktop: "lg:col-span-12 lg:row-span-1", tablet: "md:col-span-2", mobileAspect: "aspect-[5/3]" },
] as const;

export function FeaturedItems() {
  const items = FEATURED.map((f) => ({
    ...f,
    service: services.find((s) => s.slug === f.slug)!,
  })).filter((i) => i.service);

  return (
    <section className="bg-warm-1 py-20 lg:py-28">
      {/* Header stays inside the container for typographic comfort */}
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
      </div>

      {/* Image grid sits just inside the viewport edges. Small lateral
          margin, small gaps, sharp rectangular corners, editorial
          asymmetric arrangement. */}
      <div
        className="mt-14 px-3 lg:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-3 lg:auto-rows-[300px]"
        data-animate
      >
        {items.map(({ service, desktop, tablet, mobileAspect }) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className={cn("group block lg:h-full", mobileAspect, "lg:aspect-auto", tablet, desktop)}
          >
            <div className="relative img-zoom !rounded-none overflow-hidden h-full w-full">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 67vw"
                  quality={95}
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-white">
                <div className="text-[10px] uppercase tracking-[0.25em] text-accent-light flex items-center justify-between gap-2">
                  <span>{service.tagline}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="font-serif text-2xl lg:text-3xl mt-2">{service.shortTitle}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
