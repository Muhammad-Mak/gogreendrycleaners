import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Our Services — Dry Cleaning, Restoration & Tailoring",
  description:
    "Eco-friendly dry cleaning, professional wet cleaning, expert tailoring, garment restoration, household textiles, bridal preservation, and complimentary pickup & delivery.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Expert garment care for <span className="accent-text text-accent-light">every piece you own</span>.
          </>
        }
        description="From the suit you wear weekly to the keepsake you'll preserve for a generation — every garment gets the same eco-conscious process and the same fanatical attention to detail."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        size="sm"
      />
      <ServicesGrid
        heading="Full-service garment care"
        title="Seven services. One uncompromising standard."
        description="Our entire process is built around two principles: protect the fabric, protect the planet."
      />
      <FinalCta />
    </>
  );
}
