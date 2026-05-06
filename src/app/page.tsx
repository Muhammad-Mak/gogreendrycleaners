import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesPinned } from "@/components/sections/services-pinned";
import { StatsBar } from "@/components/sections/stats-bar";
import { FeaturedItems } from "@/components/sections/featured-items";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { LeadCapture } from "@/components/sections/lead-capture";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <TrustStrip />
      <ServicesPinned limit={6} />
      <StatsBar />
      <FeaturedItems />
      <GalleryPreview />
      <Testimonials />
      <LeadCapture />
      <FinalCta />
    </>
  );
}
