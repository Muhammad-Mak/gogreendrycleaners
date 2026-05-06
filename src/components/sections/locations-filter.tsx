"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Star, ArrowUpRight } from "lucide-react";
import type { Region } from "@/data/locations";
import { formatPhone, telHref } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Filter = "all" | "FL" | "NY" | "CT";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "FL", label: "Florida" },
  { id: "NY", label: "New York" },
  { id: "CT", label: "Connecticut" },
];

export function LocationsFilter({ regions }: { regions: Region[] }) {
  const [filter, setFilter] = React.useState<Filter>("all");
  const visibleRegions = filter === "all" ? regions : regions.filter((r) => r.state === filter);
  const totalShown = visibleRegions.reduce((sum, r) => sum + r.stores.length, 0);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Filter by state">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm uppercase tracking-[0.15em] transition-all duration-300 ease-premium border",
                active
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-white text-text-secondary border-warm-2 hover:border-accent/50 hover:text-accent"
              )}
            >
              {f.label}
            </button>
          );
        })}
        <span className="ml-auto text-xs uppercase tracking-[0.2em] text-text-secondary">
          {totalShown} {totalShown === 1 ? "location" : "locations"}
        </span>
      </div>

      {/* Region list */}
      <div className="mt-12 space-y-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-16"
          >
            {visibleRegions.map((region) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
