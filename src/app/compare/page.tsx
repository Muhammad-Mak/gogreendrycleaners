import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Minus, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/section-header";
import { FinalCta } from "@/components/sections/final-cta";
import { Button } from "@/components/ui/button";
import { COMPARISON, METHODS, HIGHLIGHTS, HIGHLIGHT_INDEX, type CompareCell } from "@/data/compare";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How We Compare — GreenEarth vs Other Dry-Cleaning Methods",
  description:
    "GreenEarth liquid-silicone cleaning vs PERC, hydrocarbon, SystemK4, Sensene, Intense, HiGlo, wet cleaning, and liquid CO₂. A side-by-side breakdown of how each method protects fabric, color, fit, and the planet.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "How We Compare — GreenEarth vs Other Dry-Cleaning Methods",
    description:
      "Side-by-side comparison of nine dry-cleaning processes — solvents, fabric care, environmental impact, and more.",
  },
};

function CellIcon({ v }: { v: CompareCell }) {
  if (v === "yes") return <Check className="h-4 w-4 text-accent" aria-label="Yes" />;
  if (v === "no") return <X className="h-4 w-4 text-text-secondary/40" aria-label="No" />;
  return <Minus className="h-4 w-4 text-amber-500" aria-label="Partial" />;
}

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="How We Compare"
        title={
          <>
            Premium garment care without the <span className="accent-text text-accent-light">harsh tradeoffs</span>.
          </>
        }
        description="Unlike traditional perc, petroleum-based solvents, or water-heavy methods, GreenEarth uses liquid silicone to gently clean garments — preserving fit, color, texture, trims, and the fresh feel of your clothes."
        crumbs={[{ label: "Home", href: "/" }, { label: "How We Compare" }]}
        size="sm"
      />

      {/* Intro / why-it-matters */}
      <section className="bg-bg py-20 lg:py-24">
        <div className="container max-w-4xl">
          <SectionHeader
            label="Why GreenEarth Is Different"
            title={
              <>
                Perc-free. Petroleum-free. <span className="accent-text text-accent">Silicone-based</span>.
              </>
            }
            description="GreenEarth is a perc-free, petroleum-free, silicone-based cleaning process designed to protect delicate garments, preserve color and shape, avoid harsh chemical odor, and deliver premium dry-cleaning results without water immersion."
          />
        </div>
      </section>

      {/* Highlights grid */}
      <section className="bg-warm-1 py-20 lg:py-24">
        <div className="container">
          <SectionHeader
            label="What Sets It Apart"
            title="Nineteen reasons it matters."
            description="The categories where GreenEarth's approach pulls clearly ahead of the alternatives."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5" data-animate>
            {HIGHLIGHTS.map((h) => (
              <a
                key={h.title}
                href={`#row-${h.rowId}`}
                className="group bg-white rounded-2xl p-6 border border-warm-2 hover:border-accent hover:shadow-md transition-all duration-500 ease-premium flex items-start gap-4 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-full bg-accent/10 group-hover:bg-accent transition-colors duration-300 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-base text-text group-hover:text-accent transition-colors duration-300">
                    {h.title}
                  </div>
                  <div className="text-xs text-text-secondary mt-1 leading-relaxed">{h.description}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-bg py-20 lg:py-24">
        <div className="container">
          <SectionHeader
            label="Side By Side"
            title="The full comparison."
            description="A row-by-row look at how nine common dry-cleaning processes stack up across solvent chemistry, fabric protection, sensory experience, and environmental load."
          />

          {/* Legend */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" /> <span>Yes / strong</span>
            </div>
            <div className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-amber-500" /> <span>Partial / mixed</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-text-secondary/40" /> <span>No</span>
            </div>
          </div>

          {/* Scrollable on mobile; first column is sticky so the feature
              name stays visible while horizontally scrolling methods.
              scroll-mt-24 on each row offsets the fixed navbar so the
              row isn't hidden under the header when jumped to. */}
          <div className="mt-8 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 rounded-2xl border-2 border-warm-2/80">
            <table className="w-full min-w-[920px] border-collapse">
              <thead>
                <tr className="border-b-2 border-warm-2/80">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-bg text-left p-4 border-r-2 border-warm-2/80 font-serif text-sm text-text min-w-[200px]"
                  >
                    Feature
                  </th>
                  {METHODS.map((m, i) => (
                    <th
                      key={m}
                      scope="col"
                      className={cn(
                        "p-4 text-xs uppercase tracking-[0.18em] text-center whitespace-nowrap",
                        i === HIGHLIGHT_INDEX ? "text-accent font-semibold bg-accent/5" : "text-text-secondary",
                        i < METHODS.length - 1 && "border-r border-warm-2/50"
                      )}
                    >
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, rowIdx) => (
                  <tr
                    key={row.id}
                    id={`row-${row.id}`}
                    className={cn(
                      "scroll-mt-28 transition-colors duration-300 target:bg-accent/10",
                      rowIdx % 2 === 1 && "bg-warm-1/40",
                      rowIdx < COMPARISON.length - 1 && "border-b border-warm-2/60"
                    )}
                  >
                    <th
                      scope="row"
                      className={cn(
                        "sticky left-0 z-10 text-left p-4 border-r-2 border-warm-2/80 font-medium text-sm text-text align-top min-w-[200px]",
                        rowIdx % 2 === 1 ? "bg-warm-1" : "bg-bg"
                      )}
                    >
                      <div>{row.feature}</div>
                      <div className="text-[11px] text-text-secondary font-normal mt-0.5">
                        {row.description}
                      </div>
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={cn(
                          "p-4 text-center",
                          i === HIGHLIGHT_INDEX && "bg-accent/[0.05]",
                          i < row.values.length - 1 && "border-r border-warm-2/50"
                        )}
                      >
                        <div className="flex justify-center">
                          <CellIcon v={v} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-text-secondary italic max-w-3xl">
            Comparison reflects the typical performance profile of each cleaning system in
            commercial dry-cleaning use. Individual operators may produce different results
            depending on equipment, training, and process discipline.
          </p>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="goldOutline" size="lg">
              <Link href="/services/dry-cleaning">See Our Dry Cleaning Service</Link>
            </Button>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
