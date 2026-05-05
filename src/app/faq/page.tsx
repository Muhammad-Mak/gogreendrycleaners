import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about our eco-friendly process, locations, pickup & delivery, restoration, wedding gown preservation, and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  // FAQ schema for SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Answers, <span className="accent-text text-accent-light">straight up</span>.
          </>
        }
        description="The most common questions we get about our process, our service, and our locations."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-24">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-warm-2 overflow-hidden hover:border-accent/30 transition-colors duration-300"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-7 py-6 list-none">
                  <h3 className="font-serif text-lg text-text">{f.question}</h3>
                  <span className="h-8 w-8 rounded-full bg-warm-1 group-hover:bg-accent group-hover:text-white text-text-secondary flex items-center justify-center transition-colors duration-300">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-300 group-open:rotate-45"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <div className="px-7 pb-6 text-text-secondary leading-relaxed">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
