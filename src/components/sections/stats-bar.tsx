"use client";

import * as React from "react";

type Stat = {
  /** Final numeric value to count up to. */
  value: number;
  /** Optional prefix (e.g. "$"). */
  prefix?: string;
  /** Optional suffix (e.g. "+", "%", "★"). */
  suffix?: string;
  /** Caption shown beneath. */
  label: string;
};

const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Eco-Conscious Care" },
  { value: 19, label: "Locations Across FL, NY & CT" },
  { value: 500, suffix: "+", label: "Google Reviews and Counting" },
];

export function StatsBar() {
  return (
    <section className="relative bg-mesh-dark bg-noise text-white py-20 lg:py-28 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center" data-animate>
          {STATS.map((s, i) => (
            <CountUp key={i} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ stat }: { stat: Stat }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(stat.value);
      setStarted(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started, stat.value]);

  React.useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(ease(t) * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, stat.value]);

  return (
    <div ref={ref}>
      <div className="font-serif text-5xl lg:text-6xl text-accent tabular-nums">
        {stat.prefix}{display.toLocaleString()}{stat.suffix}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.25em] text-white/60">
        {stat.label}
      </div>
    </div>
  );
}
