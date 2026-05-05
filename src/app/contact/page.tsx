"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { locationsData } from "@/data/locations";
import { formatPhone, telHref } from "@/lib/utils";

const STATES = [
  { value: "FL", label: "Florida" },
  { value: "NY", label: "New York" },
  { value: "CT", label: "Connecticut" },
];

export default function ContactPage() {
  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [state, setState] = React.useState<string>("");

  const cities = React.useMemo(() => {
    if (!state) return [];
    const region = locationsData.regions.find((r) => r.state === state);
    return region?.stores.filter((s) => s.address).map((s) => s.address!.city) ?? [];
  }, [state]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact-form" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      toast.success("Message received — we'll be in touch within one business day.");
    } catch {
      toast.error("Something went wrong. Please try calling us directly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's <span className="accent-text text-accent-light">talk garments</span>.
          </>
        }
        description="Schedule a pickup, ask about a piece you're worried about, or get in touch about a wholesale partnership. We'll get back to you within one business day."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        size="sm"
      />

      <section className="bg-bg py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <span className="section-label">Send a message</span>
              <div className="section-divider-left" aria-hidden />
              <h2 className="font-serif text-3xl lg:text-4xl text-text leading-tight">
                Request your pickup or get in touch.
              </h2>
              <p className="mt-3 text-sm text-text-secondary italic">
                Heads up: this form is for customers and service inquiries. If you're reaching out
                to sell us something, please don't — we won't be able to respond.
              </p>

              {submitted ? (
                <div className="mt-10 bg-warm-1 rounded-2xl p-10 text-center border border-warm-2">
                  <h3 className="font-serif text-2xl text-text">Thank you.</h3>
                  <p className="mt-3 text-text-secondary">
                    We've received your message and will respond within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field name="firstName" label="First name" required />
                    <Field name="lastName" label="Last name" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field name="email" label="Email" type="email" required />
                    <Field name="phone" label="Phone" type="tel" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SelectField
                      name="state"
                      label="State"
                      value={state}
                      onChange={(v) => setState(v)}
                      options={[{ value: "", label: "Select a state…" }, ...STATES]}
                      required
                    />
                    <SelectField
                      name="city"
                      label="Nearest city"
                      options={[
                        { value: "", label: state ? "Select a city…" : "Choose a state first" },
                        ...cities.map((c) => ({ value: c, label: c })),
                      ]}
                      disabled={!state}
                    />
                  </div>
                  <Field name="discountCode" label="Discount code (optional)" />
                  <TextareaField name="message" label="How can we help?" rows={5} required />

                  <div className="pt-2">
                    <Button type="submit" variant="gold" size="lg" disabled={pending}>
                      {pending ? "Sending…" : "Send message"}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 lg:pl-8">
              <span className="section-label">Reach us</span>
              <div className="section-divider-left" aria-hidden />
              <h2 className="font-serif text-2xl text-text">Direct lines</h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-1">
                      {siteConfig.phones.primaryLabel}
                    </div>
                    <a
                      href={telHref(siteConfig.phones.primary)}
                      className="text-text hover:text-accent transition-colors"
                    >
                      {formatPhone(siteConfig.phones.primary)}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-1">
                      Email
                    </div>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-text hover:text-accent transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-1">
                      Locations
                    </div>
                    <Link href="/locations" className="text-text hover:text-accent transition-colors">
                      19 stores across FL, NY & CT →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-warm-2">
                <div className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-4">
                  Follow us
                </div>
                <div className="flex gap-3">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="h-10 w-10 rounded-full border border-warm-2 hover:border-accent hover:bg-accent hover:text-white text-text-secondary transition-all duration-300 flex items-center justify-center"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="h-10 w-10 rounded-full border border-warm-2 hover:border-accent hover:bg-accent hover:text-white text-text-secondary transition-all duration-300 flex items-center justify-center"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
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
      <span className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full bg-white border border-warm-2 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors duration-300"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  required,
  disabled,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <select
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="mt-1.5 w-full bg-white border border-warm-2 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
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
      <span className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        maxLength={1000}
        className="mt-1.5 w-full bg-white border border-warm-2 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
      />
    </label>
  );
}
