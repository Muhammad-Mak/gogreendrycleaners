import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Droplets, Recycle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/section-header";
import { TrustStrip } from "@/components/sections/trust-strip";
import { FinalCta } from "@/components/sections/final-cta";
import { founders, leadership, mascot } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us — Eco-Conscious Garment Care Since 2010",
  description:
    "Founded in New York in 2010 by industry leaders Michael Koppy and Igor Madrit, GoGreen Dry Cleaners has grown into the largest eco-friendly dry-cleaning group in the East Coast.",
  alternates: { canonical: "/about" },
};

const SUSTAINABILITY = [
  {
    icon: Leaf,
    title: "Zero-VOC Solvents",
    copy: "GreenEarth™ liquid-silicone cleaning replaces traditional perchloroethylene — no toxic residues, no harsh odors.",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    copy: "Closed-loop systems and precision wet-cleaning processes use a fraction of the water of traditional facilities.",
  },
  {
    icon: Recycle,
    title: "Reduced Energy Footprint",
    copy: "Modern Unipress and GreenEarth equipment runs at lower temperatures with significantly less energy per garment.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Trusted with the wardrobe of <span className="accent-text text-accent-light">your life</span>.
          </>
        }
        description="Backed by over 50 years of combined industry experience, our team delivers luxury garment care with an eco-conscious approach."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section id="story" className="bg-bg py-20 lg:py-28 scroll-mt-24">
        <div className="container max-w-4xl">
          <SectionHeader
            label="Our Story"
            title={
              <>
                Milestones that <span className="accent-text text-accent">shaped us</span>.
              </>
            }
          />
          <div className="mt-12 space-y-6 text-base lg:text-lg text-text-secondary leading-relaxed">
            <p>
              Since its incorporation in New York in <strong className="text-text">2010</strong>,
              GoGreen Dry Cleaners™ has steadily expanded its footprint while staying true to its
              mission of sustainable, high-quality garment care.
            </p>
            <p>
              After establishing itself as the largest eco-friendly dry-cleaning group in Lower
              Westchester and Southern Connecticut, the company expanded into Florida in
              <strong className="text-text"> 2017</strong>, launching locations in Jupiter, West
              Palm Beach, Palm Beach, and Miami.
            </p>
            <p>
              GoGreen further solidified its commitment to sustainability by adopting GreenEarth
              Cleaning™ technology — a non-toxic, environmentally safe alternative to traditional
              dry-cleaning solvents. To meet the evolving needs of its upscale clientele, the
              company introduced complimentary pickup and delivery services, combining convenience
              with eco-conscious care.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section id="founders" className="bg-warm-1 py-20 lg:py-28 scroll-mt-24">
        <div className="container">
          <SectionHeader
            label="Our Founders"
            title={
              <>
                Visionaries with a passion for <span className="accent-text text-accent">craft and community</span>.
              </>
            }
            description="Two industry leaders who combined decades of experience with a shared mission: to redefine garment care through eco-conscious innovation, elevated service, and local connection."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10" data-animate>
            {founders.map((m) => (
              <article
                key={m.slug}
                className="bg-white rounded-2xl p-8 lg:p-10 border border-warm-2 shadow-sm flex flex-col"
              >
                {m.image && (
                  <div className="relative aspect-[7/10] rounded-2xl overflow-hidden mb-7 ring-1 ring-warm-2 max-w-[340px] w-full mx-auto">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="340px"
                      quality={90}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-serif text-2xl text-text">{m.name}</h3>
                  <div className="text-sm text-accent uppercase tracking-[0.18em] mt-1">{m.role}</div>
                  {m.market && (
                    <div className="text-xs text-text-secondary mt-1">{m.market}</div>
                  )}
                </div>
                <div className="space-y-4 text-text-secondary leading-relaxed flex-1">
                  {m.fullBio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {m.signature && (
                  <div className="mt-7 pt-6 border-t border-warm-2">
                    <Image
                      src={m.signature}
                      alt={`${m.name}'s signature`}
                      width={180}
                      height={48}
                      className="h-10 w-auto opacity-80"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-bg py-20 lg:py-28 scroll-mt-24">
        <div className="container">
          <SectionHeader
            label="Leadership Team"
            title="The people behind the quality and care."
            description="Our leadership team is united by a shared commitment to excellence, sustainability, and delivering a refined experience for every client we serve."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate>
            {leadership.map((m) => (
              <article
                key={m.slug}
                className="group bg-white rounded-2xl border border-warm-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-premium overflow-hidden flex flex-col"
              >
                {m.image && (
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-7 flex-1">
                  <h3 className="font-serif text-xl text-text">{m.name}</h3>
                  <div className="text-xs text-accent uppercase tracking-[0.18em] mt-1.5">{m.role}</div>
                  <p className="mt-4 text-sm text-text-secondary leading-relaxed">{m.shortBio}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Mascot */}
          {mascot.length > 0 && (
            <div className="mt-12">
              {mascot.map((m) => (
                <div
                  key={m.slug}
                  className="max-w-3xl mx-auto bg-warm-1 rounded-2xl border border-warm-2 overflow-hidden flex flex-col sm:flex-row items-center"
                >
                  {m.image && (
                    <div className="relative h-48 w-full sm:h-56 sm:w-56 flex-shrink-0">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 224px"
                        quality={90}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-7 text-center sm:text-left flex-1">
                    <div className="text-xs text-accent uppercase tracking-[0.18em]">
                      {m.role}
                    </div>
                    <h3 className="font-serif text-xl text-text mt-1">{m.name}</h3>
                    <p className="mt-3 text-sm text-text-secondary leading-relaxed italic">
                      {m.fullBio[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="bg-dark text-white py-20 lg:py-28 scroll-mt-24">
        <div className="container">
          <SectionHeader
            invert
            label="Sustainability Commitment"
            title={
              <>
                Caring for your clothes <em className="accent-text not-italic text-accent-light">and the planet</em>.
              </>
            }
            description="At GoGreen, sustainability isn't a buzzword — it's part of who we are. Our process, our equipment, and our standards are all built around minimizing impact without compromising quality."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8" data-animate>
            {SUSTAINABILITY.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="h-14 w-14 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-accent-light" />
                  </div>
                  <h3 className="font-serif text-xl text-white">{s.title}</h3>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">{s.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div id="partnerships">
        <TrustStrip />
      </div>

      <FinalCta />
    </>
  );
}
