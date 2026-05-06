"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { mainNav, HERO_PAGES, type NavItem } from "@/config/nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const overHero = (HERO_PAGES as readonly string[]).includes(pathname);
  const transparent = overHero && !scrolled && !mobileOpen;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // When the user clicks "Home" or the logo while already on the home
  // page, Next.js doesn't navigate (same route) and the page doesn't
  // scroll. Smooth-scroll to the top instead.
  const handleHomeClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMobileOpen(false);
      }
    },
    [pathname]
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium",
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.06)]"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="GoGreen Dry Cleaners home"
          className="relative flex items-center gap-2"
          onClick={handleHomeClick}
        >
          <Image
            src="/images/brand/logo.png"
            alt="GoGreen Dry Cleaners"
            width={180}
            height={48}
            priority
            className="h-9 w-auto transition-[filter] duration-500 ease-premium"
            style={{
              // Over the hero: keep white (no filter).
              // Scrolled / inner pages: colorize the white PNG to the brand green #48B11A.
              // Filter chain: brightness(0) → black, then invert/sepia/saturate/hue-rotate
              // re-colorize to the target green.
              filter: transparent
                ? "none"
                : "brightness(0) saturate(100%) invert(54%) sepia(72%) saturate(1059%) hue-rotate(58deg) brightness(95%) contrast(91%)",
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {mainNav.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              transparent={transparent}
              pathname={pathname}
              onHomeClick={handleHomeClick}
            />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            variant={transparent ? "whiteOutline" : "gold"}
            size="default"
          >
            <Link href="/contact">Schedule Pickup</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "lg:hidden p-2 -mr-2 transition-colors duration-300",
            transparent ? "text-white" : "text-text"
          )}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-warm-2 bg-white"
          >
            <nav className="container py-6 flex flex-col gap-1">
              {mainNav.map((item) => (
                <MobileNavGroup key={item.label} item={item} onHomeClick={handleHomeClick} />
              ))}
              <div className="pt-4">
                <Button asChild variant="gold" size="lg" className="w-full">
                  <Link href="/contact">Schedule Pickup</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  item,
  transparent,
  pathname,
  onHomeClick,
}: {
  item: NavItem;
  transparent: boolean;
  pathname: string;
  onHomeClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={item.href === "/" ? onHomeClick : undefined}
        className={cn(
          "relative text-sm tracking-wide transition-colors duration-300 group",
          transparent
            ? "text-white/90 hover:text-white"
            : "text-text-secondary hover:text-accent",
          active && (transparent ? "text-white" : "text-accent")
        )}
      >
        {item.label}
        <span
          className={cn(
            "pointer-events-none absolute -bottom-1 left-0 h-px bg-current transition-all duration-300",
            active ? "w-full" : "w-0 group-hover:w-full"
          )}
        />
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1 text-sm tracking-wide transition-colors duration-300",
          transparent
            ? "text-white/90 hover:text-white"
            : "text-text-secondary hover:text-accent",
          active && (transparent ? "text-white" : "text-accent")
        )}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </Link>
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full pt-4 min-w-[260px]",
          "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 -translate-y-1 transition-all duration-500 ease-premium"
        )}
      >
        <div className="bg-white/85 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 ring-1 ring-warm-2/40 p-2">
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-4 py-3 rounded-xl text-sm text-text hover:bg-warm-1/80 hover:text-accent transition-colors duration-200"
            >
              <div className="font-medium">{child.label}</div>
              {child.description && (
                <div className="text-xs text-text-secondary mt-0.5">{child.description}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavGroup({
  item,
  onHomeClick,
}: {
  item: NavItem;
  onHomeClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={item.href === "/" ? onHomeClick : undefined}
        className="py-3 text-base text-text hover:text-accent transition-colors duration-200"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="py-2">
      <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium pt-2 pb-1">
        {item.label}
      </div>
      <div className="flex flex-col">
        {item.children.map((child) => (
          <Link
            key={child.label}
            href={child.href}
            className="py-2 pl-3 text-base text-text-secondary hover:text-accent transition-colors duration-200"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
