"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg pt-20">
      <div className="container max-w-xl text-center py-24">
        <span className="section-label">Something went wrong</span>
        <div className="section-divider" aria-hidden />
        <h1 className="font-serif text-4xl lg:text-5xl text-text leading-tight">
          A small <span className="accent-text text-accent">stain</span> in our system.
        </h1>
        <p className="mt-5 text-text-secondary">
          We've been notified and are looking into it. Try refreshing — or call us directly if you need anything urgent.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Button onClick={reset} variant="gold" size="lg">
            Try again
          </Button>
          <Button asChild variant="goldOutline" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
        {error.digest && (
          <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-text-secondary">
            Error reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
