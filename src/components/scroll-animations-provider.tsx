"use client";

import { useScrollAnimations } from "@/hooks/use-scroll-animations";

/**
 * Drop into the root layout (client side) so every page benefits from the
 * IntersectionObserver-driven reveal animations without each page having
 * to mount its own.
 */
export function ScrollAnimationsProvider({ children }: { children: React.ReactNode }) {
  useScrollAnimations();
  return <>{children}</>;
}
