import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/section-header";
import { LocationsFilter } from "@/components/sections/locations-filter";
import { FinalCta } from "@/components/sections/final-cta";
import { locationsData } from "@/data/locations";

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

          <div className="mt-14">
            <LocationsFilter regions={locationsData.regions} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
