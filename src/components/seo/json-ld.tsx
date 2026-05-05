import { siteConfig } from "@/config/site";
import { allLocations } from "@/data/locations";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/brand/logo.png`,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    foundingDate: String(siteConfig.legal.incorporated),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinesses = allLocations
    .filter((s) => s.address && s.type === "storefront")
    .map((s) => ({
      "@context": "https://schema.org",
      "@type": "DryCleaningOrLaundry",
      "@id": `${siteConfig.url}/locations/${s.slug}`,
      name: `${siteConfig.brand} — ${s.name}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: s.address!.street,
        addressLocality: s.address!.city,
        addressRegion: s.address!.state,
        postalCode: s.address!.zip,
        addressCountry: "US",
      },
      telephone: s.phone ?? undefined,
      url: `${siteConfig.url}/locations/${s.slug}`,
      ...(s.rating && s.review_count
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: s.rating,
              reviewCount: s.review_count,
            },
          }
        : {}),
    }));

  const json = [organization, website, ...localBusinesses];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
