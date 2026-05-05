import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the GoGreen Dry Cleaners website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-24">
        <div className="container max-w-3xl prose-content text-text-secondary leading-relaxed space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
            Last updated: January 1, 2026
          </p>
          <p>
            These Terms of Service govern your use of gogreendrycleaners.com and any services
            provided by GoGreen Dry Cleaners, Inc. By accessing this site or using our services,
            you agree to these terms.
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">Services</h2>
          <p>
            Our services include dry cleaning, wet cleaning, alterations and tailoring, restoration,
            household textiles, bridal preservation, and complimentary pickup &amp; delivery. Service
            availability and turnaround times vary by location.
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">Liability</h2>
          <p>
            We take exceptional care with every garment. However, dyes, fibers, and trims can react
            unpredictably even to the gentlest cleaning. Our liability for any single garment is
            limited to ten times the cleaning charge, not exceeding the garment's depreciated value.
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">Unclaimed Items</h2>
          <p>
            Items not picked up within 90 days will be considered abandoned and may be donated to
            charity. We make every reasonable effort to contact you before doing so.
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">Changes</h2>
          <p>
            We may update these terms from time to time. The "last updated" date above will reflect
            any changes.
          </p>

          <div className="mt-10 p-5 bg-warm-1 rounded-xl text-sm border border-warm-2">
            <strong className="text-text">Placeholder copy.</strong> These terms are a generic
            starting point. Please have them reviewed by counsel before deployment.
          </div>
        </div>
      </section>
    </>
  );
}
