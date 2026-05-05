import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg pt-20">
      <div className="container max-w-xl text-center py-24">
        <span className="section-label">404</span>
        <div className="section-divider" aria-hidden />
        <h1 className="font-serif text-4xl lg:text-5xl text-text leading-tight">
          That <span className="accent-text text-accent">page</span> isn't here.
        </h1>
        <p className="mt-5 text-text-secondary">
          The page you were looking for either moved or never existed. Here are a few good places to start instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Button asChild variant="gold" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="goldOutline" size="lg">
            <Link href="/locations">Find a location</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
