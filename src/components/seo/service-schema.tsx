import { siteConfig } from "@/config/site";
import type { Service } from "@/data/services";
import type { FaqItem } from "@/data/faq";

/**
 * Emits Schema.org Service + FAQPage JSON-LD for a service detail page.
 * Service schema improves eligibility for "service" rich results in Google;
 * FAQPage schema can render Q&A directly under the SERP listing.
 */
export function ServiceSchema({ service, faqs }: { service: Service; faqs: FaqItem[] }) {
  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}#service`,
    name: service.title,
    description: service.description,
    serviceType: service.shortTitle,
    provider: {
      "@type": "Organization",
      name: siteConfig.brand,
      url: siteConfig.url,
    },
    areaServed: [
      { "@type": "State", name: "Florida" },
      { "@type": "State", name: "New York" },
      { "@type": "State", name: "Connecticut" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.shortTitle} Features`,
      itemListElement: service.features.map((f, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: f },
      })),
    },
  };

  const faqJson = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJson) }}
      />
      {faqJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
        />
      )}
    </>
  );
}
