"use client";

import * as React from "react";
import { Building2, Hotel, Stethoscope, Dumbbell, Briefcase, Sparkles, Truck, ShieldCheck, Tag, Layers } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/sections/final-cta";

const ADVANTAGES = [
  { icon: ShieldCheck, title: "Quality Assurance", copy: "Every order inspected and finished to the same standard our retail clients expect." },
  { icon: Truck, title: "Fast Turnaround", copy: "High volumes handled with precision — without sacrificing quality." },
  { icon: Tag, title: "White-Label Ready", copy: "Custom branding, flexible service agreements, your name on the bag." },
  { icon: Layers, title: "Scalable Capacity", copy: "From a few hundred shirts a week to multi-property portfolios." },
];

const SERVICES = [
  {
    title: "White-Label Dry Cleaning",
    bullets: ["Custom branding options", "Flexible service agreements", "Quality control for consistent results"],
  },
  {
    title: "Bulk Laundry Processing",
    bullets: ["Hotels & hospitality", "Medical facilities", "Fitness centers & spas"],
  },
  {
    title: "Specialty Garment Care",
    bullets: ["Uniform cleaning & pressing", "Linens, curtains, and drapery", "Delicate fabric & high-end garments"],
  },
  {
    title: "Logistics & Delivery",
    bullets: ["Flexible scheduling", "Route optimization", "Secure handling of all garments"],
  },
];

const INDUSTRIES = [
  { icon: Hotel, label: "Hospitality & Hotels" },
  { icon: Briefcase, label: "Corporate Offices & Uniforms" },
  { icon: Stethoscope, label: "Healthcare Facilities" },
  { icon: Dumbbell, label: "Fitness & Wellness" },
  { icon: Sparkles, label: "Event & Entertainment" },
  { icon: Building2, label: "Multi-Family Residential" },
];

export default function WholesalePage() {
  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  async function handleQuote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "wholesale-quote" }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      toast.success("Quote request received — our wholesale team will reply within one business day.");
    } catch {
      toast.error("Couldn't send your request. Please try again or call us.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Wholesale Solutions"
        title={
          <>
            Reliable wholesale care for <span className="accent-text text-accent-light">businesses & institutions</span>.
          </>
        }
        description="Eco-friendly, high-volume garment care tailored to your operation. White-label, bulk laundry, specialty handling, logistics — built around your brand standards."
        crumbs={[{ label: "Home", href: "/" }, { label: "Wholesale" }]}
      />

      {/* Advantages */}
      <section className="bg-bg py-20 lg:py-28">
        <div className="container">
          <SectionHeader
            label="What Sets Us Apart"
            title={
              <>
                More than service — <span className="accent-text text-accent">peace of mind</span>.
              </>
            }
            description="Wholesale partners trust us for consistency, professionalism, and environmentally responsible care that aligns with their brand standards."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-animate>
            {ADVANTAGES.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="bg-white rounded-2xl p-7 border border-warm-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-premium"
                >
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg text-text">{a.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{a.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-warm-1 py-20 lg:py-28">
        <div className="container">
          <SectionHeader label="Our Wholesale Services" title="Capabilities, end to end." />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6" data-animate>
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 border border-warm-2">
                <h3 className="font-serif text-xl text-text">{s.title}</h3>
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-bg py-20 lg:py-24">
        <div className="container">
          <SectionHeader
            label="Industries We Serve"
            title="Tailored to your sector."
          />
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4" data-animate>
            {INDUSTRIES.map((i) => {
              const Icon = i.icon;
              return (
                <div
                  key={i.label}
                  className="bg-white rounded-2xl p-6 border border-warm-2 flex items-center gap-4"
                >
                  <div className="h-11 w-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-serif text-lg text-text">{i.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="bg-dark text-white py-20 lg:py-28 scroll-mt-24">
        <div className="container max-w-3xl">
          <SectionHeader
            invert
            label="Get a Quote"
            title={
              <>
                Build a sustainable partnership <span className="accent-text text-accent-light">with us</span>.
              </>
            }
            description="Tell us about your operation and we'll come back with a tailored proposal."
          />
          <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="font-serif text-2xl text-white">Request received.</h3>
                <p className="mt-3 text-white/70">Our wholesale team will reply within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleQuote} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <DarkField name="businessName" label="Business name" required />
                  <DarkField name="contactName" label="Your name" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <DarkField name="email" label="Email" type="email" required />
                  <DarkField name="phone" label="Phone" type="tel" required />
                </div>
                <DarkField name="address" label="Business address (city, state, zip)" required />
                <DarkTextarea name="needs" label="Tell us about your laundry needs" rows={5} required />
                <Button type="submit" variant="gold" size="lg" className="w-full" disabled={pending}>
                  {pending ? "Sending…" : "Request a Quote"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function DarkField({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
        {label}
        {required && <span className="text-accent-light ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors duration-300"
      />
    </label>
  );
}

function DarkTextarea({
  name,
  label,
  rows = 4,
  required,
}: {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
        {label}
        {required && <span className="text-accent-light ml-1">*</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        maxLength={1000}
        className="mt-1.5 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
      />
    </label>
  );
}
