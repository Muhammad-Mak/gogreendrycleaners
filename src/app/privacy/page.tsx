import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GoGreen Dry Cleaners collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-24">
        <div className="container max-w-3xl prose-content text-text-secondary leading-relaxed space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
            Last updated: January 1, 2026
          </p>
          <p>
            This Privacy Policy describes how GoGreen Dry Cleaners, Inc. ("we", "us", or "our")
            collects, uses, and shares information about you when you visit our website, use our
            services, or interact with us in any way.
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">Information we collect</h2>
          <p>
            When you use our website or services, we may collect: contact information (name, email,
            phone, address); service details (the items you bring in, pickup and delivery preferences,
            and instructions); and standard log data (IP address, browser type, pages visited).
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">How we use information</h2>
          <p>
            We use the information we collect to provide and improve our services, communicate with
            you about your orders, send service updates and (with your permission) marketing
            messages, and comply with legal obligations.
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">How we share information</h2>
          <p>
            We do not sell your personal information. We share data only with service providers who
            help us operate (payment processors, SMS providers, analytics) and only as required by
            law.
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">Your rights</h2>
          <p>
            You can request access to, correction of, or deletion of your personal information at
            any time by contacting us. Residents of certain states may have additional rights under
            applicable law.
          </p>

          <h2 className="font-serif text-2xl text-text mt-10">Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href="mailto:info@gogreendrycleaners.net" className="text-accent hover:underline">
              info@gogreendrycleaners.net
            </a>
            .
          </p>

          <div className="mt-10 p-5 bg-warm-1 rounded-xl text-sm border border-warm-2">
            <strong className="text-text">Placeholder copy.</strong> This privacy policy is a
            generic starting point. Please have it reviewed by counsel before deployment.
          </div>
        </div>
      </section>
    </>
  );
}
