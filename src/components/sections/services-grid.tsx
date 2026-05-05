import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";

export function ServicesGrid({
  heading = "What we do",
  title = "Service for the way you actually live.",
  description = "From the suit you wear weekly to the dress you'll only wear once — every garment gets the same attention to detail and the same eco-conscious process.",
  limit,
}: {
  heading?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  limit?: number;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="container">
        <SectionHeader label={heading} title={title} description={description} />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7" data-animate>
          {list.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white rounded-2xl p-8 border border-warm-2 hover:border-accent/30 transition-all duration-500 ease-premium hover:-translate-y-2 hover:shadow-xl flex flex-col"
              >
                <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                  <Icon className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-2xl text-text">{s.shortTitle}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-accent">{s.tagline}</p>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed flex-1">{s.description}</p>
                <div className="mt-6 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-text group-hover:text-accent transition-colors duration-300">
                  <span>Learn more</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {limit && (
          <div className="mt-14 text-center">
            <Button asChild variant="goldOutline" size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
