import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Star, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/sections/final-cta";
import { allLocations } from "@/data/locations";
import { formatPhone, telHref } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return allLocations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const store = allLocations.find((s) => s.slug === slug);
  if (!store) return {};
  return {
    title: `${store.name} — GoGreen Dry Cleaners`,
    description:
      store.address
        ? `Eco-friendly dry cleaning, alterations, and pickup & delivery at ${store.address.street}, ${store.address.city}, ${store.address.state}.`
        : `GoGreen Dry Cleaners — ${store.name} concierge service.`,
    alternates: { canonical: `/locations/${store.slug}` },
  };
}

export default async function LocationDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const store = allLocations.find((s) => s.slug === slug);
  if (!store) notFound();

  return (
    <>
      <PageHero
        eyebrow={store.address ? `${store.address.city}, ${store.address.state}` : "Concierge Route"}
        title={store.name}
        description={
          store.type === "van-route"
            ? "Concierge van route — schedule complimentary pickup and delivery."
            : "Eco-friendly dry cleaning, expert tailoring, and complimentary pickup & delivery."
        }
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: store.name },
        ]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <span className="section-label">Visit us</span>
              <div className="section-divider-left" aria-hidden />
              <h2 className="font-serif text-2xl lg:text-3xl text-text">{store.name}</h2>

              <div className="mt-8 space-y-6">
                {store.address && (
                  <InfoRow icon={MapPin} label="Address">
                    {store.address.street}<br />
                    {store.address.city}, {store.address.state} {store.address.zip}
                  </InfoRow>
                )}
                {store.phone && (
                  <InfoRow icon={Phone} label="Phone">
                    <a
                      href={telHref(store.phone)}
                      className="hover:text-accent transition-colors"
                    >
                      {formatPhone(store.phone)}
                    </a>
                  </InfoRow>
                )}
                {store.rating && store.review_count && (
                  <InfoRow icon={Star} label="Rating">
                    <span className="font-medium text-text">{store.rating.toFixed(1)}</span> · {store.review_count} Google reviews
                  </InfoRow>
                )}
                <div className="text-xs text-text-secondary italic">
                  Hours vary by location. Please check Google Maps or call ahead.
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact">Schedule Pickup</Link>
                </Button>
                {store.maps_url && (
                  <Button asChild variant="goldOutline" size="lg">
                    <a href={store.maps_url} target="_blank" rel="noopener noreferrer">
                      Get Directions <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <aside className="bg-warm-1 rounded-2xl p-6 lg:p-7 border border-warm-2 h-fit">
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Services available</div>
              <ul className="space-y-2 text-sm text-text">
                <li>Eco-friendly dry cleaning</li>
                <li>Wet cleaning</li>
                <li>Alterations & tailoring</li>
                <li>Garment restoration</li>
                <li>Bridal preservation</li>
                <li>Free pickup & delivery</li>
              </ul>
              <div className="mt-6 pt-5 border-t border-warm-2">
                <Link href="/services" className="text-xs uppercase tracking-[0.2em] text-accent inline-flex items-center gap-1.5">
                  All services <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-accent" />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-1">{label}</div>
        <div className="text-base text-text">{children}</div>
      </div>
    </div>
  );
}
