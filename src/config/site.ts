export const siteConfig = {
  name: "GoGreen Dry Cleaners",
  brand: "GoGreen Dry Cleaners™",
  tagline: "Eco-conscious garment care, delivered.",
  description:
    "Premium eco-friendly dry cleaning, alterations, restoration, and complimentary pickup & delivery — across 19 locations in Florida, New York, and Connecticut.",
  url: "https://gogreendrycleaners.com",
  email: "info@gogreendrycleaners.net",
  phones: {
    primary: "561-225-1952",
    primaryLabel: "West Palm Beach",
  },
  social: {
    instagram: "https://www.instagram.com/gogreen_drycleaners/",
    facebook: "https://www.facebook.com/people/Go-Green-Dry-Cleaners-FL/100067798480666/",
  },
  legal: {
    company: "GoGreen Dry Cleaners, Inc.",
    incorporated: 2010,
  },
  reviews: {
    totalAcrossLocations: 527,
    weightedAverage: 4.3,
    headerCopy: "500+ Google reviews across 19 locations in Florida, New York & Connecticut",
  },
} as const;

export type SiteConfig = typeof siteConfig;
