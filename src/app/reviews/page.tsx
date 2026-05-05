import type { Metadata } from "next";
import { Star, MapPin, Quote } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Client Reviews",
  description:
    "Read what 500+ Google-reviewed clients say about their experience with GoGreen Dry Cleaners across Florida, New York, and Connecticut.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Reviews"
        title={
          <>
            What our <span className="accent-text text-accent-light">neighbors</span> are saying.
          </>
        }
        description={siteConfig.reviews.headerCopy}
        crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate>
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="bg-white rounded-2xl p-7 border border-warm-2 shadow-sm flex flex-col h-full relative"
              >
                <Quote className="absolute top-5 left-5 h-7 w-7 text-accent/15" />
                <div className="mt-5 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < t.rating ? "text-accent fill-accent" : "text-warm-2"
                      )}
                    />
                  ))}
                </div>
                <p className="mt-4 text-text leading-relaxed text-[15px] flex-1 italic">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-warm-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-serif text-base text-text">{t.author}</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-[0.18em] mt-0.5">
                      Verified Google Review
                    </div>
                  </div>
                  {t.location && (
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      <span>{t.location}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
