import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { locationsData } from "@/data/locations";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-mesh-dark bg-noise text-white/80 overflow-hidden">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <Image
              src="/images/brand/logo.png"
              alt={siteConfig.brand}
              width={200}
              height={56}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/60 max-w-sm">
              {siteConfig.description}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol
            heading="Browse"
            links={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Locations", href: "/locations" },
              { label: "Gallery", href: "/gallery" },
              { label: "Reviews", href: "/reviews" },
            ]}
          />

          <FooterCol
            heading="Services"
            links={[
              { label: "Dry Cleaning & Restoration", href: "/services" },
              { label: "Wholesale Solutions", href: "/wholesale" },
              { label: "Franchise Opportunity", href: "/franchise" },
              { label: "Schedule Pickup", href: "/contact" },
              { label: "Request a Quote", href: "/wholesale#quote" },
            ]}
          />

          <FooterCol
            heading="Resources"
            links={[
              { label: "Blog", href: "/blog" },
              { label: "FAQ", href: "/faq" },
              { label: "How We Compare", href: "/compare" },
              { label: "Contact Us", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ]}
          />
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-[0.2em] mb-4">
            Florida · New York · Connecticut
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            {locationsData.regions.flatMap((r) =>
              r.stores
                .filter((s) => s.type === "storefront")
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/locations/${s.slug}`}
                    className="hover:text-accent transition-colors duration-200"
                  >
                    {s.name}
                  </Link>
                ))
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>
            © {year} {siteConfig.legal.company}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-serif text-base text-accent mb-5">{heading}</h3>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-white/70 hover:text-white transition-colors duration-200">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
