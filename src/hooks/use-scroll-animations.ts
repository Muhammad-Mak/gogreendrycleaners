"use client";

import { useEffect } from "react";

/**
 * Mounts an IntersectionObserver that toggles `is-visible` on elements
 * matching the supplied selectors when they enter the viewport. Fires
 * once per element. Used together with the .reveal / .reveal-left /
 * .reveal-right / [data-animate] CSS in globals.css.
 */
export function useScrollAnimations(
  selectors: string[] = [".reveal", ".reveal-left", ".reveal-right", "[data-animate]"]
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = selectors.flatMap((sel) => Array.from(document.querySelectorAll(sel)));

    if (reduceMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectors]);
}
