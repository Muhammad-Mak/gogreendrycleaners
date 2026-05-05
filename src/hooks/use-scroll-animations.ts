"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mounts an IntersectionObserver that toggles `is-visible` on elements
 * matching the supplied selectors when they enter the viewport. Fires
 * once per element. Used together with the .reveal / .reveal-left /
 * .reveal-right / [data-animate] CSS in globals.css.
 *
 * Re-runs on every route change so client-side navigation in the App
 * Router picks up the new page's animated elements (otherwise they'd
 * stay at opacity:0 forever).
 */
export function useScrollAnimations(
  selectors: string[] = [
    ".reveal",
    ".reveal-left",
    ".reveal-right",
    ".reveal-scale",
    ".reveal-blur",
    ".reveal-up-deep",
    "[data-animate]",
  ]
) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Defer one frame so any newly-mounted page content is committed to the DOM
    // before we query for it.
    let observer: IntersectionObserver | null = null;
    const raf = window.requestAnimationFrame(() => {
      const targets = selectors.flatMap((sel) => Array.from(document.querySelectorAll(sel)));

      if (reduceMotion) {
        targets.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );

      targets.forEach((el) => observer!.observe(el));
    });

    return () => {
      window.cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [pathname, selectors]);
}
