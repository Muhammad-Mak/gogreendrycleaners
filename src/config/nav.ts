export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Dry Cleaning & Restoration", href: "/services", description: "Our full range of garment care" },
      { label: "Wholesale Solutions", href: "/wholesale", description: "B2B and white-label cleaning" },
      { label: "Franchise Opportunity", href: "/franchise", description: "Open a GoGreen location" },
    ],
  },
  { label: "Locations", href: "/locations" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#story" },
      { label: "Founders", href: "/about#founders" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Partnerships", href: "/about#partnerships" },
      { label: "Sustainability", href: "/about#sustainability" },
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "How We Compare", href: "/compare" },
      { label: "Reviews", href: "/reviews" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export const HERO_PAGES = ["/"] as const;
