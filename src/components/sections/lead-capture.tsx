"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const FEATURES = [
  "Complimentary pickup & delivery",
  "Eco-friendly, non-toxic process",
  "Status updates by text",
  "First-time client welcome rate",
];

export function LeadCapture() {
  const [submitted, setSubmitted] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "lead-capture" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      toast.success("Thanks — we'll be in touch shortly.");
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="relative bg-dark text-white overflow-hidden py-24 lg:py-32">
      {/* Soft accent glows */}
      <div
        aria-hidden
        className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-accent/30 blur-3xl opacity-[0.05]"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/40 blur-3xl opacity-[0.05]"
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal-left">
            <span className="section-label">Welcome Offer</span>
            <div className="section-divider-left" aria-hidden />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight text-balance">
              First pickup is on <span className="accent-text text-accent-light">us</span>.
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed text-lg max-w-xl">
              Leave us your details and we'll get a concierge bag to your door — no commitment, no
              subscription, no hassle. Just garments back in 48 hours.
            </p>

            <ul className="mt-10 space-y-4">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-right">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="h-14 w-14 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-accent-light" />
                  </div>
                  <h3 className="font-serif text-2xl text-white">You're on the list.</h3>
                  <p className="mt-3 text-white/70">
                    We'll reach out within one business day to schedule your first complimentary
                    pickup.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-2xl text-white mb-2">Schedule your first pickup</h3>
                  <Field name="name" label="Full name" required />
                  <Field name="email" label="Email" type="email" required />
                  <Field name="phone" label="Phone" type="tel" required />
                  <Field name="zip" label="ZIP code" required />
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full mt-2"
                    disabled={pending}
                  >
                    {pending ? "Sending…" : "Schedule my pickup"}
                  </Button>
                  <p className="text-[11px] text-white/40 text-center pt-2">
                    By submitting you agree to be contacted by GoGreen Dry Cleaners. We never share
                    your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors duration-300"
      />
    </label>
  );
}
