import { Leaf, Droplets, Scissors, Flame, Home, Heart, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  image?: string;
};

export const services: Service[] = [
  {
    slug: "dry-cleaning",
    title: "Eco-Friendly Dry Cleaning",
    shortTitle: "Dry Cleaning",
    tagline: "Our signature service.",
    description:
      "A non-toxic, zero-VOC process built around liquid silicone. Effective on the toughest stains and gentle enough for the most delicate fabrics — without the petrochemical odor that traditional perc cleaning leaves behind.",
    icon: Leaf,
    features: ["Gentle on fabrics", "Zero-VOC, non-toxic", "Safe for sensitive skin"],
    image: "/images/services/geotagged-1.jpg",
  },
  {
    slug: "wet-cleaning",
    title: "Professional Wet Cleaning",
    shortTitle: "Wet Cleaning",
    tagline: "Water-based, precision controlled.",
    description:
      "Ideal for delicate fabrics that respond best to controlled moisture. Specialized detergents and precise temperature control protect texture, color, and shape.",
    icon: Droplets,
    features: ["Suitable for delicates", "Maintains shape and color", "Gentle yet effective"],
    image: "/images/services/geotagged-2.jpg",
  },
  {
    slug: "alterations",
    title: "Alterations & Expert Tailoring",
    shortTitle: "Alterations",
    tagline: "From a simple hem to a full re-fit.",
    description:
      "Skilled tailors trained on couture and ready-to-wear. Every garment fitted with the same precision we'd give our own.",
    icon: Scissors,
    features: ["Dress alterations", "Pant hemming", "Suit adjustments", "Zippers and buttons"],
    image: "/images/services/geotagged-3.jpg",
  },
  {
    slug: "restoration",
    title: "Garment Restoration",
    shortTitle: "Restoration",
    tagline: "Bringing keepsakes back from the brink.",
    description:
      "Specialized restoration for garments and textiles affected by fire, mold, and water damage. Our restoration division has been built around the kinds of pieces you can't replace.",
    icon: Flame,
    features: ["Fire and smoke damage", "Mold and mildew", "Water damage recovery"],
    image: "/images/services/geotagged-4.jpg",
  },
  {
    slug: "household",
    title: "Household Item Cleaning",
    shortTitle: "Household",
    tagline: "Beyond the closet.",
    description:
      "Expert cleaning for the textiles that bring your home together — rugs, comforters, drapery, linens, and more.",
    icon: Home,
    features: ["Oriental and area rugs", "Comforters, duvets, linens", "Draperies and curtains"],
    image: "/images/services/geotagged-5.jpg",
  },
  {
    slug: "bridal",
    title: "Bridal Gown Preservation",
    shortTitle: "Bridal",
    tagline: "Built to outlast a generation.",
    description:
      "Meticulous cleaning followed by archival-quality preservation. Because the dress is one of the few things that should last as long as the memory.",
    icon: Heart,
    features: ["Gentle cleaning for delicate fabrics", "Stain removal and fabric protection", "Archival-quality packaging"],
    image: "/images/services/geotagged-6.jpg",
  },
  {
    slug: "pickup-delivery",
    title: "Free Pickup & Delivery",
    shortTitle: "Pickup & Delivery",
    tagline: "Concierge service, on the house.",
    description:
      "Schedule a time, leave your garments at the door — we handle the rest. Complimentary in select areas.",
    icon: Truck,
    features: ["Easy online scheduling", "Contactless pickup", "Reliable, on-time service"],
    image: "/images/services/geotagged-7.jpg",
  },
];

export const featuredServiceSlugs = ["dry-cleaning", "restoration", "bridal"];
