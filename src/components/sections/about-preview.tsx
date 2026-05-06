import Image from "next/image";
import Link from "next/link";
import { Leaf, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutPreview() {
  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 lg:items-start">
          {/* Image — sticks while the right column scrolls past on desktop */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="relative reveal-scale">
              <div className="absolute -bottom-6 -right-6 -z-10 h-3/4 w-3/4 bg-accent/10 rounded-2xl" />
              <div className="absolute -top-6 -left-6 -z-10 h-3/4 w-3/4 border border-accent/30 rounded-2xl" />
              <div className="relative img-zoom rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <Image
                  src="/images/services/geotagged-3.jpg"
                  alt="Inside a GoGreen Dry Cleaners storefront — eco-friendly garment care across Florida, New York, and Connecticut"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  quality={90}
                  className="object-cover"
                />
              </div>

              {/* Floating stats card — glass treatment */}
              <div className="absolute -bottom-8 -right-4 lg:right-8 bg-white/85 backdrop-blur-xl rounded-2xl shadow-2xl p-6 max-w-[200px] border border-white/60 ring-1 ring-warm-2/40">
                <div className="font-serif text-4xl text-accent">15+</div>
                <div className="text-xs uppercase tracking-[0.18em] text-text-secondary mt-1">
                  Years of <br />Eco-Conscious Care
                </div>
              </div>
            </div>
          </div>

          {/* Right column — scrolls past the pinned portrait. Made tall on
              purpose: each pillar gets its own "scroll moment" so the
              sticky split has room to breathe. */}
          <div>
            <div className="reveal-right">
              <span className="section-label">Our Story</span>
              <div className="section-divider-left" aria-hidden />
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text leading-tight text-balance">
                A neighborhood cleaner with a <span className="accent-text text-accent">bigger idea</span>.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-text-secondary leading-relaxed">
                Since incorporating in New York in 2010, GoGreen Dry Cleaners™ has grown into the
                largest eco-friendly dry-cleaning group in Lower Westchester and Southern Connecticut —
                and brought the same ethic to Florida in 2017. We adopted GreenEarth™ liquid-silicone
                technology because the petrochemical default was never the answer.
              </p>
            </div>

            <div className="mt-16 lg:mt-24 space-y-12 lg:space-y-16" data-animate>
              <Pillar
                icon={Leaf}
                eyebrow="The process"
                title="A zero-VOC, non-toxic clean."
                copy="Liquid silicone — a clear, odorless solvent — replaces the perchloroethylene most cleaners still use. It's gentle enough for the most delicate fabrics, effective on the toughest stains, and leaves no chemical residue or smell on your garments."
              />
              <Pillar
                icon={Award}
                eyebrow="The people"
                title="Fifty years of combined experience."
                copy="Founder-led, family-owned. The leadership team's backgrounds in luxury hospitality and high-end garment care shape every standard we hold ourselves to — from how a hem is finished to how your bag is tagged at pickup."
              />
              <Pillar
                icon={MapPin}
                eyebrow="The reach"
                title="Nineteen locations, one standard."
                copy="Florida, New York, and Connecticut — every store runs the same playbook. And in select areas, complimentary concierge pickup &amp; delivery means you never need to set foot inside one to enjoy the work that happens there."
              />
            </div>

            <div className="mt-12 lg:mt-16">
              <Button asChild variant="goldOutline" size="lg">
                <Link href="/about">Read Our Full Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({
  icon: Icon,
  eyebrow,
  title,
  copy,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="reveal-up-deep">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <span className="text-xs uppercase tracking-[0.22em] text-accent">{eyebrow}</span>
      </div>
      <h3 className="mt-5 font-serif text-2xl lg:text-3xl text-text leading-tight text-balance">
        {title}
      </h3>
      <p className="mt-3 text-base lg:text-lg text-text-secondary leading-relaxed">{copy}</p>
    </div>
  );
}
