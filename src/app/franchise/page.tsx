import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Franchise Opportunity",
  description:
    "Open a GoGreen Dry Cleaners location. We're expanding across the East Coast — sustainable, premium garment care with a proven operating model.",
  alternates: { canonical: "/franchise" },
};

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="Franchise"
        title={
          <>
            Open a <span className="accent-text text-accent-light">GoGreen</span> location.
          </>
        }
        description="We're growing — sustainably, deliberately, and with operators who share our standards. Franchise inquiries are open across Florida, New York, Connecticut, and beyond."
        crumbs={[{ label: "Home", href: "/" }, { label: "Franchise" }]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-28">
        <div className="container max-w-2xl text-center">
          <span className="section-label">Coming soon</span>
          <div className="section-divider" aria-hidden />
          <h2 className="font-serif text-3xl lg:text-4xl text-text leading-tight">
            A full franchise prospectus is on the way.
          </h2>
          <p className="mt-5 text-text-secondary leading-relaxed">
            In the meantime, if you're a qualified operator interested in opening a GoGreen Dry
            Cleaners location, we'd love to hear from you. Email our team directly and we'll get
            back to you with our current criteria, territory availability, and next steps.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button asChild variant="gold" size="lg">
              <a href={`mailto:${siteConfig.email}?subject=Franchise%20Inquiry`}>
                <Mail className="h-4 w-4" /> Email franchise team
              </a>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <Link href="/contact">Or use the contact form</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
