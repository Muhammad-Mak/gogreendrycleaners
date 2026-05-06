"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDES = [
  "/images/services/geotagged-1.jpg",
  "/images/services/geotagged-3.jpg",
  "/images/services/geotagged-5.jpg",
  "/images/services/geotagged-6.jpg",
  "/images/services/geotagged-7.jpg",
];

const VIDEO_SRC = "/videos/hero.mp4";

export function Hero() {
  const [active, setActive] = React.useState(0);
  const [videoFailed, setVideoFailed] = React.useState(false);
  const slideCount = SLIDES.length;

  // Track scroll progress through the hero so we can fade content out as
  // it leaves the viewport. offset:[startStart, endStart] = 0 when the
  // hero's top hits the viewport top, 1 when its bottom does.
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Content fades out and drifts up over the first 60% of the scroll.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  // Video stays put but scales down a touch — gives a subtle camera-out
  // feel while the content peels off above it.
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  // Scroll cue dot fades fast — it shouldn't survive past the first nudge.
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Auto-advance the still-image carousel that sits behind the video.
  // If the video plays, it covers the carousel — but we still rotate so
  // there's something behind in case the video errors out.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slideCount);
    }, 6000);
    return () => window.clearInterval(id);
  }, [slideCount]);

  const next = () => setActive((i) => (i + 1) % slideCount);
  const prev = () => setActive((i) => (i - 1 + slideCount) % slideCount);

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Video bg — primary. Poster shows instantly so it becomes the LCP
          element rather than a blank/dark frame. preload="metadata" defers
          full download until autoplay actually begins. */}
      {!videoFailed && (
        <motion.video
          style={{ scale: mediaScale }}
          src={VIDEO_SRC}
          poster="/images/services/geotagged-1.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Image carousel — fallback, plus visible during the video's first frame */}
      <div className={cn("absolute inset-0 -z-0", !videoFailed && "opacity-0")}>
        {SLIDES.map((src, i) => (
          <div
            key={src}
            style={{ transitionDuration: "1500ms" }}
            className={cn(
              "absolute inset-0 transition-opacity ease-premium",
              i === active ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={i !== active}
          >
            <div
              className={cn(
                "h-full w-full bg-cover bg-center",
                i === active && "animate-kenburns"
              )}
              style={{ backgroundImage: `url(${src})` }}
              key={`${src}-${active === i ? "active" : "idle"}`}
            />
          </div>
        ))}
      </div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 h-full flex items-center"
      >
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent-light text-xs uppercase tracking-[0.2em] backdrop-blur-sm border border-white/10 reveal">
              Eco-Friendly · Family-Owned · Since 2010
            </span>
            <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] text-balance reveal-blur">
              Garment care, <span className="accent-text text-accent-light">considered</span>.
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-white/85 max-w-2xl leading-relaxed">
              Premium eco-friendly dry cleaning, expert tailoring, and complimentary concierge
              pickup &amp; delivery — across nineteen locations in Florida, New York, and Connecticut.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link href="/contact">Schedule Complimentary Pickup</Link>
              </Button>
              <Button asChild variant="whiteOutline" size="xl">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Carousel controls — only when the video isn't playing */}
      {videoFailed && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-premium",
                  i === active ? "w-8 bg-accent" : "w-3 bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll indicator — fades out as soon as the user starts scrolling */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="hidden md:flex absolute bottom-8 right-8 z-30 items-center gap-3 text-white/60"
      >
        <div className="h-10 w-6 rounded-full border border-white/40 flex items-start justify-center pt-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-white animate-bounce-soft" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>
    </section>
  );
}
