import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Bento layout: 6-column × 2-row grid on desktop (collapses to 1-col on mobile,
 * 2-col on tablet). Cells are uniform 280px tall, so cards never overlap or
 * misalign. Spans:
 *
 *   Row 1: [    bridal 4×2     ] [ alterations 2×2 ]
 *   Row 2: [    bridal cont.   ] [ alterations cont. ]
 *   Row 3: [ restoration 3×1   ] [ household 3×1     ]
 */
const FEATURED = [
  { slug: "bridal",      desktop: "lg:col-span-4 lg:row-span-2", tablet: "md:col-span-2", mobileAspect: "aspect-[5/4]" },
  { slug: "alterations", desktop: "lg:col-span-2 lg:row-span-2", tablet: "",              mobileAspect: "aspect-[5/4]" },
  { slug: "restoration", desktop: "lg:col-span-3 lg:row-span-1", tablet: "",              mobileAspect: "aspect-[5/4]" },
  { slug: "household",   desktop: "lg:col-span-3 lg:row-span-1", tablet: "",              mobileAspect: "aspect-[5/4]" },
] as const;

export function FeaturedItems() {
  const items = FEATURED.map((f) => ({
    ...f,
    service: services.find((s) => s.slug === f.slug)!,
  })).filter((i) => i.service);

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

        <div
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5 lg:auto-rows-[260px]"
          data-animate
        >
          {items.map(({ service, desktop, tablet, mobileAspect }) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={cn("group block lg:h-full", mobileAspect, "lg:aspect-auto", tablet, desktop)}
            >
              <div className="relative img-zoom rounded-2xl overflow-hidden shadow-md h-full w-full">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7 text-white">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-accent-light flex items-center justify-between gap-2">
                    <span>{service.tagline}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="font-serif text-xl lg:text-2xl mt-2">{service.shortTitle}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
