"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function chunkBy(items: Testimonial[], size: number): Testimonial[][] {
  const groups: Testimonial[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

export function Testimonials() {
  const [perView, setPerView] = React.useState(3);
  const [page, setPage] = React.useState(0);
  const [hover, setHover] = React.useState(false);

  // Responsive perView
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (mq.matches) setPerView(3);
      else if (md.matches) setPerView(2);
      else setPerView(1);
    };
    update();
    mq.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);

  const pages = React.useMemo(() => chunkBy(testimonials, perView), [perView]);
  const pageCount = pages.length;

  // Reset page when perView changes
  React.useEffect(() => {
    setPage(0);
  }, [perView]);

  // Auto-advance
  React.useEffect(() => {
    if (hover || pageCount <= 1) return;
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, 6500);
    return () => window.clearInterval(id);
  }, [hover, pageCount]);

  const next = () => setPage((p) => (p + 1) % pageCount);
  const prev = () => setPage((p) => (p - 1 + pageCount) % pageCount);

  return (
    <section className="bg-warm-1 py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          label="What Our Clients Are Saying"
          title={
            <>
              Read what your <span className="accent-text text-accent">neighbors</span> say.
            </>
          }
          description={
            <>
              <span className="block">{siteConfig.reviews.headerCopy}</span>
            </>
          }
        />

        <div
          className="relative mt-14"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "grid gap-6",
                perView === 1 && "grid-cols-1",
                perView === 2 && "grid-cols-2",
                perView === 3 && "grid-cols-3"
              )}
            >
              {pages[page]?.map((t) => <TestimonialCard key={t.id} t={t} />)}
            </motion.div>
          </AnimatePresence>

          {pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonials"
                className="h-10 w-10 rounded-full border border-warm-2 hover:border-accent hover:bg-accent hover:text-white text-text-secondary transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500 ease-premium",
                      i === page ? "w-8 bg-accent" : "w-3 bg-warm-2 hover:bg-accent/50"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonials"
                className="h-10 w-10 rounded-full border border-warm-2 hover:border-accent hover:bg-accent hover:text-white text-text-secondary transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="bg-white rounded-2xl p-8 border border-warm-2 shadow-sm flex flex-col h-full relative">
      <Quote className="absolute top-6 left-6 h-8 w-8 text-accent/15" />
      <div className="mt-6 flex items-center gap-0.5">
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
          <div className="text-xs text-text-secondary uppercase tracking-[0.18em] mt-0.5">
            Verified Customer
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
  );
}
