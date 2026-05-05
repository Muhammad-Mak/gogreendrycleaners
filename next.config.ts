import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gogreendrycleaners.net",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  /**
   * 308 permanent redirects for the duplicate blog slugs migrated from the
   * source WordPress site (the "-2" / "-choose" / "-services" variants were
   * republished duplicates of canonical posts). Consolidates ranking signal
   * to a single URL per article.
   */
  async redirects() {
    const blogDupes: [string, string][] = [
      ["freshen-up-your-style-the-power-of-regular-dry-cleaning-2", "freshen-up-your-style-the-power-of-regular-dry-cleaning"],
      ["tips-for-choosing-the-right-dry-cleaning-service-choose", "tips-for-choosing-the-right-dry-cleaning-service"],
      ["how-can-dry-cleaning-save-you-money-and-time-2", "how-can-dry-cleaning-save-you-money-and-time"],
      ["cleaning-up-our-act-the-eco-friendly-revolution-in-dry-cleaning-2", "cleaning-up-our-act-the-eco-friendly-revolution-in-dry-cleaning"],
      ["dapper-delicate-unveiling-the-secrets-of-expert-dry-cleaning-2", "dapper-delicate-unveiling-the-secrets-of-expert-dry-cleaning"],
      ["dry-cleaning-myths-what-you-need-to-know-services", "dry-cleaning-myths-what-you-need-to-know"],
    ];

    return [
      // Source-site URL pattern — old typo'd "Coming Soon" page
      { source: "/comming-soon", destination: "/franchise", permanent: true },
      { source: "/comming-soon/", destination: "/franchise", permanent: true },
      // Source-site empty Resources hub — superseded by the footer
      { source: "/resources", destination: "/blog", permanent: true },
      // Source-site request forms — folded into Contact / Wholesale
      { source: "/request-a-service", destination: "/contact", permanent: true },
      { source: "/request-a-quote", destination: "/wholesale#quote", permanent: true },
      // Source-site FAQ slug
      { source: "/resources-faq", destination: "/faq", permanent: true },
      // Old "uncategorized" WordPress URL prefix
      { source: "/uncategorized/:slug", destination: "/blog/:slug", permanent: true },
      // Blog duplicates
      ...blogDupes.map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        permanent: true,
      })),
    ];
  },
};

export default config;
