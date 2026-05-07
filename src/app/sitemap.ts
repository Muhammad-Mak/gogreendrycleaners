import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { allLocations } from "@/data/locations";
import { blogPosts } from "@/data/blog-posts";

/**
 * Priority guide:
 *   1.0  homepage
 *   0.95 primary commercial pages (services index, locations index, contact)
 *   0.9  high-intent landing pages (each service detail, each location detail, wholesale)
 *   0.8  brand pages (about, reviews, gallery, faq)
 *   0.7  secondary pages (franchise, blog index)
 *   0.6  individual blog posts
 *   0.3  legal (privacy, terms)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "",            priority: 1.0,  changeFrequency: "weekly"  as const },
    { path: "/services",   priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/locations",  priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/contact",    priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/wholesale",  priority: 0.9,  changeFrequency: "monthly" as const },
    { path: "/about",      priority: 0.8,  changeFrequency: "monthly" as const },
    { path: "/reviews",    priority: 0.8,  changeFrequency: "weekly"  as const },
    { path: "/gallery",    priority: 0.8,  changeFrequency: "monthly" as const },
    { path: "/faq",        priority: 0.8,  changeFrequency: "monthly" as const },
    { path: "/franchise",  priority: 0.7,  changeFrequency: "monthly" as const },
    { path: "/blog",       priority: 0.7,  changeFrequency: "weekly"  as const },
    { path: "/compare",    priority: 0.8,  changeFrequency: "monthly" as const },
    { path: "/privacy",    priority: 0.3,  changeFrequency: "yearly"  as const },
    { path: "/terms",      priority: 0.3,  changeFrequency: "yearly"  as const },
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const locationRoutes: MetadataRoute.Sitemap = allLocations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
