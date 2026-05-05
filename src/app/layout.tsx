import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollAnimationsProvider } from "@/components/scroll-animations-provider";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand} — Eco-friendly Dry Cleaning & Delivery`,
    template: `%s · ${siteConfig.brand}`,
  },
  description: siteConfig.description,
  keywords: [
    "eco-friendly dry cleaning",
    "green dry cleaners",
    "GreenEarth cleaning",
    "garment restoration",
    "wedding gown preservation",
    "alterations",
    "tailoring",
    "pickup and delivery",
    "Florida dry cleaners",
    "New York dry cleaners",
    "Connecticut dry cleaners",
  ],
  authors: [{ name: siteConfig.legal.company }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.brand,
    title: `${siteConfig.brand} — Eco-friendly Dry Cleaning & Delivery`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brand,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <JsonLd />
        <ScrollAnimationsProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ScrollAnimationsProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
