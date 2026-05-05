import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="container">
        <div className="relative bg-mesh-warm bg-noise rounded-3xl px-6 sm:px-12 lg:px-20 py-16 lg:py-20 text-center max-w-5xl mx-auto border border-warm-2 reveal overflow-hidden">
          <span className="section-label">Ready when you are</span>
          <div className="section-divider" aria-hidden />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text leading-tight text-balance max-w-3xl mx-auto">
            Cleaner clothes, lighter footprint, <span className="accent-text text-accent">no compromise</span>.
          </h2>
          <p className="mt-5 text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
            Schedule a complimentary pickup, find your nearest store, or talk to our wholesale team.
            We're ready to make garment care the easiest thing on your list.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button asChild variant="gold" size="lg">
              <Link href="/contact">Schedule Pickup</Link>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <Link href="/locations">Find a Location</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
