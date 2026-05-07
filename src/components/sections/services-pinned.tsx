"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";

/**
 * Home-page variant of the services section.
 *
 * Two-column sticky layout: the left column pins to the viewport while
 * the right column's vertical stack of service cards scrolls past. The
 * grid version (services-grid.tsx) is still used on the /services index
 * page where a denser layout makes more sense.
 *
 * The "View All Services" CTA sits in the sticky column next to
 * Schedule Pickup but its opacity is scroll-tied: it fades in as you
 * scroll through the service stack and reaches full visibility around
 * the time you hit the last card.
 */
export function ServicesPinned({ limit = 6 }: { limit?: number }) {
  const list = services.slice(0, limit);

  // Scroll-tied opacity for the "View All Services" CTA. Track scroll
  // progress through the section: 0 when the section's top hits the
  // bottom of the viewport (just appeared), 1 when its bottom hits the
  // bottom (fully scrolled into view). The button starts fading in at
  // 60% and is fully visible by 90%.
  //
  // The fade is desktop-only — on mobile the aside isn't sticky, so the
  // button would scroll off-screen long before its scroll-tied opacity
  // reached 1. Below lg, we render the button at full opacity instead.
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const viewAllOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const viewAllY = useTransform(scrollYProgress, [0.6, 0.9], [12, 0]);

  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 lg:items-start">
          {/* Sticky left column */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 lg:h-fit">
            <span className="section-label">What we do</span>
            <div className="section-divider-left" aria-hidden />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text leading-tight text-balance">
              Service for the way you <span className="accent-text text-accent">actually live</span>.
            </h2>
            <p className="mt-5 text-base lg:text-lg text-text-secondary leading-relaxed">
              From the suit you wear weekly to the dress you&apos;ll only wear once — every garment
              gets the same attention to detail and the same eco-conscious process.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <Button asChild variant="goldOutline" size="lg">
                <Link href="/contact">Schedule Pickup</Link>
              </Button>
              <motion.div style={isDesktop ? { opacity: viewAllOpacity, y: viewAllY } : undefined}>
                <Button asChild variant="gold" size="lg">
                  <Link href="/services">View All Services</Link>
                </Button>
              </motion.div>
            </div>
          </aside>

          {/* Scrolling right column */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8" data-animate>
            {list.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="reveal-up-deep group relative block bg-white rounded-2xl border border-warm-2 hover:border-accent/30 transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
                    {s.image && (
                      <div className="relative sm:col-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[260px] overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 280px"
                          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/0 sm:to-white transition-opacity duration-700 ease-premium group-hover:opacity-0" />
                      </div>
                    )}
                    <div className={`p-7 lg:p-9 flex flex-col ${s.image ? "sm:col-span-3" : "sm:col-span-5"}`}>
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                          <Icon className="h-5 w-5 text-accent group-hover:text-white transition-colors duration-500" />
                        </div>
                        <span className="text-xs uppercase tracking-[0.22em] text-accent">{s.tagline}</span>
                      </div>
                      <h3 className="mt-5 font-serif text-2xl lg:text-3xl text-text leading-tight">
                        {s.shortTitle}
                      </h3>
                      <p className="mt-3 text-sm lg:text-base text-text-secondary leading-relaxed flex-1">
                        {s.description}
                      </p>
                      <div className="mt-6 flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-text group-hover:text-accent transition-colors duration-300">
                        <span>Learn more</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
