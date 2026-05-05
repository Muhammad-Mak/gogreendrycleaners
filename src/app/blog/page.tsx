import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Eco-Friendly Dry Cleaning & Garment Care",
  description:
    "Expert insights, industry trends, and best practices on eco-friendly dry cleaning, garment restoration, and luxury fabric care.",
  alternates: { canonical: "/blog" },
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Eco-friendly garment care, <span className="accent-text text-accent-light">explained</span>.
          </>
        }
        description="Expert insights, industry trends, and best practices for clothing that lasts longer and lives lighter."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        size="sm"
      />

      {/* Featured post */}
      {featured && (
        <section className="bg-bg pt-20 lg:pt-24">
          <div className="container">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="img-zoom rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="section-label">Latest</span>
                  <div className="section-divider-left" aria-hidden />
                  <h2 className="font-serif text-3xl lg:text-4xl text-text leading-tight group-hover:text-accent transition-colors duration-500">
                    {featured.title}
                  </h2>
                  <div className="mt-3 text-xs uppercase tracking-[0.2em] text-text-secondary">
                    {formatDate(featured.date)}
                  </div>
                  <p className="mt-5 text-text-secondary leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
                    Read article <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="bg-bg py-20 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" data-animate>
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-warm-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-premium"
              >
                <div className="img-zoom relative aspect-[3/2]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 lg:p-7">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-accent">
                    {formatDate(p.date)}
                  </div>
                  <h3 className="mt-2 font-serif text-xl text-text leading-tight group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
