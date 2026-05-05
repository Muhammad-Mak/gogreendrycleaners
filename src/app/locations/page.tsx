import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Star, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/section-header";
import { FinalCta } from "@/components/sections/final-cta";
import { locationsData } from "@/data/locations";
import { formatPhone, telHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Find a Location — 19 Stores Across FL, NY & CT",
  description:
    "Locate your nearest GoGreen Dry Cleaners. 19 storefront and concierge locations across Florida, New York, and Connecticut.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title={
          <>
            Find your <span className="accent-text text-accent-light">nearest store</span>.
          </>
        }
        description="Nineteen locations across Florida, New York, and Connecticut. Drop in or schedule complimentary concierge pickup — whichever fits your week."
        crumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-28">
        <div className="container">
          <SectionHeader
            label="Serving Three States"
            title={
              <>
                Across Florida, <span className="accent-text text-accent">New York</span>, and Connecticut.
              </>
            }
          />

          <div className="mt-14 space-y-16">
            {locationsData.regions.map((region) => (
              <div key={region.state}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-10 bg-accent" />
                  <h3 className="font-serif text-2xl text-text">
                    {region.label}
                    <span className="ml-3 text-sm text-text-secondary">
                      ({region.stores.length} {region.stores.length === 1 ? "location" : "locations"})
                    </span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-animate>
                  {region.stores.map((store) => (
                    <article
                      key={store.slug}
                      className="bg-white rounded-2xl p-6 border border-warm-2 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-premium flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-serif text-xl text-text">{store.name}</h4>
                        {store.rating && (
                          <div className="flex items-center gap-1 text-xs text-text-secondary flex-shrink-0">
                            <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                            <span className="font-medium text-text">{store.rating.toFixed(1)}</span>
                            <span>({store.review_count})</span>
                          </div>
                        )}
                      </div>

                      {store.type === "van-route" ? (
                        <div className="mt-3 text-sm text-text-secondary italic">
                          Concierge van route only — schedule pickup directly.
                        </div>
                      ) : (
                        <>
                          {store.address && (
                            <div className="mt-3 flex items-start gap-2 text-sm text-text-secondary">
                              <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>
                                {store.address.street}<br />
                                {store.address.city}, {store.address.state} {store.address.zip}
                              </span>
                            </div>
                          )}
                          {store.phone && (
                            <a
                              href={telHref(store.phone)}
                              className="mt-2 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                            >
                              <Phone className="h-3.5 w-3.5 text-accent" />
                              {formatPhone(store.phone)}
                            </a>
                          )}
                        </>
                      )}

                      <div className="mt-5 pt-5 border-t border-warm-2 flex items-center gap-3 text-xs uppercase tracking-[0.18em]">
                        <Link
                          href={`/locations/${store.slug}`}
                          className="text-accent hover:text-accent-dark inline-flex items-center gap-1.5"
                        >
                          Details <ArrowUpRight className="h-3 w-3" />
                        </Link>
                        {store.maps_url && (
                          <a
                            href={store.maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-accent inline-flex items-center gap-1.5 ml-auto"
                          >
                            Directions <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
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
