import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  /** Background image URL — defaults to a brand storefront photo */
  image?: string;
  /** Smaller hero band on inner pages */
  size?: "sm" | "md";
  className?: string;
};

const DEFAULT_IMG = "/images/services/geotagged-2.jpg";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image = DEFAULT_IMG,
  size = "md",
  className,
}: Props) {
  return (
    <section
      className={cn(
        "relative w-full",
        size === "sm" ? "min-h-[320px] md:min-h-[400px]" : "min-h-[420px] md:min-h-[520px]",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <div className="relative h-full flex items-center pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container w-full">
          <div className="max-w-3xl">
            {crumbs && crumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.2em] text-white/70">
                <ol className="flex flex-wrap items-center gap-1.5">
                  {crumbs.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      {c.href ? (
                        <Link href={c.href} className="hover:text-accent-light transition-colors">
                          {c.label}
                        </Link>
                      ) : (
                        <span className="text-white">{c.label}</span>
                      )}
                      {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 text-white/40" />}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {eyebrow && <span className="section-label text-accent-light">{eyebrow}</span>}
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-balance">
              {title}
            </h1>
            {description && (
              <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
