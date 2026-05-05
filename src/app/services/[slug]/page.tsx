import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.tagline}
        title={service.title}
        description={service.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
        image={service.image}
        size="md"
      />

      <section className="bg-bg py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <span className="section-label">What you can expect</span>
              <div className="section-divider-left" aria-hidden />
              <h2 className="font-serif text-3xl lg:text-4xl text-text leading-tight">
                The full {service.shortTitle.toLowerCase()} experience.
              </h2>
              <ul className="mt-8 space-y-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-text">
                    <span className="mt-1 h-5 w-5 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <span className="text-base lg:text-lg">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact">Schedule a Pickup</Link>
                </Button>
                <Button asChild variant="goldOutline" size="lg">
                  <Link href="/locations">Find a Location</Link>
                </Button>
              </div>
            </div>

            {service.image && (
              <div className="img-zoom rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-warm-1 py-20 lg:py-24">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="font-serif text-2xl lg:text-3xl text-text">Explore other services</h2>
            <Link
              href="/services"
              className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accent-dark inline-flex items-center gap-2"
            >
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-white rounded-2xl p-7 border border-warm-2 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-premium"
                >
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent transition-colors duration-500">
                    <SIcon className="h-5 w-5 text-accent group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-xl text-text">{s.shortTitle}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
