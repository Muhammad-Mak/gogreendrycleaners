import { blogBodies, type BlogBodyNode } from "./blog-bodies";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  /** Local image path. Source thumbnails were stock photography and were
   * not migrated; we cycle through real GoGreen storefront photos until
   * proper editorial imagery is sourced. */
  image: string;
  /** Structured body — merged in by getBlogPost from src/data/blog-bodies.ts.
   * Posts with no body still render their excerpt as a fallback card. */
  body?: BlogBodyNode[];
};

/**
 * Topic-matched image library. Picks the best image per blog post by
 * matching keywords in the slug. Falls back to a rotating storefront
 * photo for posts that don't fit a topic.
 */
const TOPICS = {
  bridal: "/images/topics/bridal.jpg",
  alterations: "/images/topics/alterations.jpg",
  suits: "/images/topics/suits.jpg",
  shopper: "/images/topics/personal-shopper.jpg",
  fitting: "/images/topics/dress-fitting.jpg",
  laundry: "/images/topics/laundry-couple.jpg",
  questioning: "/images/topics/eco-questioning.jpg",
  rack: "/images/topics/dry-cleaning-rack.jpg",
  ecoFlorida: "/images/topics/eco-florida.jpg",
  petrochem: "/images/topics/petrochemical-free.jpg",
} as const;

const FALLBACK_STOREFRONTS = [
  "/images/services/geotagged-1.jpg",
  "/images/services/geotagged-2.jpg",
  "/images/services/geotagged-3.jpg",
  "/images/services/geotagged-4.jpg",
  "/images/services/geotagged-5.jpg",
  "/images/services/geotagged-6.jpg",
  "/images/services/geotagged-7.jpg",
];

function pickImage(slug: string, fallbackIndex: number): string {
  const s = slug.toLowerCase();
  if (s.includes("wedding") || s.includes("bride") || s.includes("bridal")) return TOPICS.bridal;
  if (s.includes("petrochemical") || s.includes("delicate-fabric")) return TOPICS.petrochem;
  if (s.includes("business-attire") || s.includes("suits")) return TOPICS.suits;
  if (s.includes("retail-partnership") || s.includes("fashion-retail")) return TOPICS.shopper;
  if (s.includes("closet") || s.includes("sustainable-living") || s.includes("future-of-fashion")) return TOPICS.fitting;
  if (s.includes("myth") || s.includes("labels") || s.includes("eco-friendly-vs-traditional")) return TOPICS.questioning;
  if (s.includes("save-you-money") || s.includes("delivery") || s.includes("regular-dry-cleaning") || s.includes("special-event")) return TOPICS.laundry;
  if (s.includes("florida") || s.includes("miami") || s.includes("palm-beach")) return TOPICS.ecoFlorida;
  if (s.includes("alterations") || s.includes("dapper") || s.includes("tips-for-choosing") || s.includes("extends-life") || s.includes("freshen-up") || s.includes("5-signs")) return TOPICS.alterations;
  if (s.includes("dry-cleaning") || s.includes("revolution") || s.includes("expands") || s.includes("connecticut") || s.includes("new-york") || s.includes("top-10")) return TOPICS.rack;
  if (s.includes("behind-the-scenes") || s.includes("going-green") || s.includes("make-your-clothes-last")) return TOPICS.rack;
  return FALLBACK_STOREFRONTS[fallbackIndex % FALLBACK_STOREFRONTS.length];
}

const stub = (slugs: { slug: string; title: string; excerpt: string; date: string }[]): BlogPost[] =>
  slugs.map((p, i) => ({ ...p, image: pickImage(p.slug, i) }));

export const blogPosts: BlogPost[] = stub([
  {
    slug: "eco-friendly-dry-cleaning-in-florida-garment-care",
    title: "Why Choosing Eco-Friendly Dry Cleaning in Florida Matters for Your Garments and the Environment",
    excerpt:
      "In today's fast-paced lifestyle, dry cleaning has become a convenient way to maintain the appearance and longevity of our clothes. However, traditional dry cleaning can come at a cost.",
    date: "2025-12-26",
  },
  {
    slug: "how-our-petrochemical-free-dry-cleaning-process-protects-delicate-fabrics",
    title: "How Our Petrochemical Free Dry Cleaning Process Protects Delicate Fabrics",
    excerpt:
      "Delicate fabrics require a different level of attention — one that respects the structure of the fibers, the dyes used, the finish applied during manufacturing.",
    date: "2025-12-26",
  },
  {
    slug: "how-to-care-for-your-business-attire-professional-clothing-tips-for-the-modern-workforce",
    title: "How to Care for Your Business Attire: Professional Clothing Tips for the Modern Workforce",
    excerpt:
      "Whether you're running a business in Boca or commuting to Midtown Manhattan, your professional wardrobe makes a statement. Proper garment care protects your investment.",
    date: "2025-12-18",
  },
  {
    slug: "wedding-dress-care-why-eco-friendly-cleaning-is-the-best-way-to-preserve-memories",
    title: "Wedding Dress Care: Why Eco-Friendly Cleaning Is the Best Way to Preserve Memories",
    excerpt:
      "Your wedding dress holds more than fabric — it holds memories. Whether it's delicate lace, silk, or beading, the right preservation makes all the difference.",
    date: "2025-12-18",
  },
  {
    slug: "why-eco-friendly-dry-cleaning-is-the-future-of-fashion-retail-partnerships",
    title: "Why Eco-Friendly Dry Cleaning Is the Future of Fashion Retail Partnerships",
    excerpt:
      "The fashion industry is evolving — and sustainability is leading the way. As designers and retailers embrace eco-conscious values, partnerships with green services are becoming the norm.",
    date: "2025-12-18",
  },
  {
    slug: "sustainable-living-starts-in-your-closet-how-small-choices-make-a-big-impact",
    title: "Sustainable Living Starts in Your Closet: How Small Choices Make a Big Impact",
    excerpt:
      "Sustainability starts at home — and one of the most overlooked places to make a difference is your closet.",
    date: "2025-12-18",
  },
  {
    slug: "eco-friendly-dry-cleaning-myths-separating-fact-from-fiction",
    title: "Eco-Friendly Dry Cleaning Myths: Separating Fact from Fiction",
    excerpt:
      "Eco-friendly dry cleaning has grown in popularity, but misinformation still surrounds it. Let's debunk some common myths.",
    date: "2025-12-18",
  },
  {
    slug: "the-truth-about-eco-friendly-labels-in-dry-cleaning-what-to-look-for",
    title: "The Truth About \"Eco-Friendly\" Labels in Dry Cleaning: What to Look For",
    excerpt:
      "These days, it seems like every business wants to be 'eco-friendly.' But when it comes to dry cleaning, not all green claims are equal.",
    date: "2025-12-18",
  },
  {
    slug: "behind-the-scenes-how-go-green-dry-cleaners-protects-your-clothes-and-the-planet",
    title: "Behind the Scenes: How GoGreen Dry Cleaners Protects Your Clothes and the Planet",
    excerpt:
      "At GoGreen Dry Cleaners, sustainability isn't just a slogan — it's our standard. From the cleaning methods we use to the equipment we run.",
    date: "2025-12-18",
  },
  {
    slug: "go-green-dry-cleaners-expands-in-south-florida-new-locations-coming-soon",
    title: "GoGreen Dry Cleaners Expands in South Florida — New Locations Coming Soon",
    excerpt: "Exciting news: new locations are on the way across South Florida.",
    date: "2025-12-12",
  },
  {
    slug: "eco-friendly-dry-cleaning-in-palm-beach-county",
    title: "Eco-Friendly Dry Cleaning in Palm Beach County",
    excerpt: "Sustainable garment care for Palm Beach County's most discerning clientele.",
    date: "2025-09-18",
  },
  {
    slug: "eco-friendly-dry-cleaning-in-miami-sustainable-garment-care-you-can-trust",
    title: "Eco-Friendly Dry Cleaning in Miami: Sustainable Garment Care You Can Trust",
    excerpt:
      "Miami is a city that never slows down — from South Beach to Brickell. Whether it's a gala or a big meeting, your wardrobe needs to look its best.",
    date: "2025-09-18",
  },
  {
    slug: "eco-friendly-dry-cleaning-in-new-york-serving-brewster-cortlandt-manor-larchmont-pelham",
    title: "Eco-Friendly Dry Cleaning in New York — Serving Brewster, Cortlandt Manor, Larchmont & Pelham",
    excerpt: "Premium eco-friendly dry cleaning across our four New York locations.",
    date: "2025-09-18",
  },
  {
    slug: "eco-friendly-vs-traditional-dry-cleaning-whats-the-real-difference-going-green-makes",
    title: "Eco-Friendly vs. Traditional Dry Cleaning: What's the Real Difference?",
    excerpt: "A side-by-side look at the chemistry, the environmental impact, and the results.",
    date: "2025-09-18",
  },
  {
    slug: "the-future-of-fashion-care-why-eco-friendly-dry-cleaning-matters",
    title: "The Future of Fashion Care: Why Eco-Friendly Dry Cleaning Matters",
    excerpt: "Fashion's future is being written in fabric chemistry. Here's where green cleaning fits in.",
    date: "2025-09-18",
  },
  {
    slug: "make-your-clothes-last-longer-with-eco-friendly-dry-cleaning-tips-for-south-florida-and-new-york-lifestyles",
    title: "Make Your Clothes Last Longer with Eco-Friendly Dry Cleaning",
    excerpt: "Practical tips for South Florida and New York lifestyles.",
    date: "2025-09-18",
  },
  {
    slug: "5-signs-its-time-to-take-your-clothes-to-the-cleaner",
    title: "5 Signs It's Time to Take Your Clothes to the Cleaner",
    excerpt: "When DIY laundry isn't enough — the signals to watch for.",
    date: "2025-09-18",
  },
  {
    slug: "how-green-dry-cleaning-extends-life-of-clothes",
    title: "How Green Dry Cleaning Extends the Life of Your Clothes",
    excerpt: "The science behind why gentler is better — and longer.",
    date: "2025-09-18",
  },
  {
    slug: "is-dry-cleaning-delivery-the-solution-to-your-busy-life",
    title: "Is Dry Cleaning Delivery the Solution to Your Busy Life?",
    excerpt: "Concierge garment care, on your schedule.",
    date: "2025-09-18",
  },
  {
    slug: "how-can-dry-cleaning-save-you-money-and-time",
    title: "How Can Dry Cleaning Save You Money and Time?",
    excerpt: "The math on professional care versus replacement and DIY damage.",
    date: "2025-09-18",
  },
  {
    slug: "tips-for-choosing-the-right-dry-cleaning-service",
    title: "Tips for Choosing the Right Dry Cleaning Service",
    excerpt: "What to look for, what to avoid, and what questions to ask.",
    date: "2025-09-18",
  },
  {
    slug: "freshen-up-your-style-the-power-of-regular-dry-cleaning",
    title: "Freshen Up Your Style: The Power of Regular Dry Cleaning",
    excerpt: "Why a regular cadence matters more than the occasional deep clean.",
    date: "2025-09-18",
  },
  {
    slug: "dry-cleaning-myths-what-you-need-to-know",
    title: "Dry Cleaning Myths — What You Need to Know",
    excerpt: "Separating fact from fiction across decades of dry-cleaning lore.",
    date: "2025-09-18",
  },
  {
    slug: "top-10-items-you-can-take-to-the-dry-cleaners",
    title: "Top 10 Items You Can Take to the Dry Cleaners",
    excerpt: "Beyond suits and dresses — the ten everyday items that benefit most.",
    date: "2025-09-18",
  },
  {
    slug: "eco-friendly-dry-cleaning-in-connecticut-stamford-norwalk-harbour-point",
    title: "Eco-Friendly Dry Cleaning in Connecticut — Stamford, Norwalk, Harbor Point",
    excerpt: "Premium eco-friendly garment care for Connecticut's coastal communities.",
    date: "2025-09-18",
  },
  {
    slug: "why-south-florida-and-tri-state-residents-are-going-green-with-their-dry-cleaning",
    title: "Why South Florida and Tri-State Residents Are Going Green With Their Dry Cleaning",
    excerpt: "A regional shift toward eco-conscious garment care.",
    date: "2025-09-18",
  },
  {
    slug: "how-to-get-special-event-clothing-cleaning-done-the-right-way",
    title: "How to Get Special-Event Clothing Cleaning Done The Right Way",
    excerpt: "Tuxes, gowns, and statement pieces — handled with the precision the moment deserves.",
    date: "2025-05-22",
  },
  {
    slug: "cleaning-up-our-act-the-eco-friendly-revolution-in-dry-cleaning",
    title: "Cleaning Up Our Act: The Eco-Friendly Revolution in Dry Cleaning",
    excerpt: "How an industry built on petrochemicals is rewriting itself.",
    date: "2025-05-09",
  },
  {
    slug: "dapper-delicate-unveiling-the-secrets-of-expert-dry-cleaning",
    title: "Dapper & Delicate: Unveiling the Secrets of Expert Dry Cleaning",
    excerpt: "What separates a great dry cleaner from a good one.",
    date: "2025-05-09",
  },
]);

export function getBlogPost(slug: string): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  const body = blogBodies[slug];
  return body ? { ...post, body } : post;
}

export function getRecentPosts(n: number): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
}
