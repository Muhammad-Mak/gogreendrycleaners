export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * FAQ — original 4 from /resources-faq/ plus 8 additional Q&As mined from
 * the blog content (petrochemical-free process, eco-friendly methodology,
 * pickup & delivery, restoration, wedding gown care).
 */
export const faqs: FaqItem[] = [
  {
    question: "What makes GoGreen Dry Cleaners™ eco-friendly?",
    answer:
      "We use non-toxic, biodegradable solvents and processes that reduce water and energy consumption — prioritizing your health and the planet. Our facilities are built around GreenEarth™ liquid silicone technology, a clean alternative to traditional perchloroethylene (perc) dry cleaning.",
  },
  {
    question: "Where are your locations?",
    answer:
      "We operate 19 locations across Florida, New York, and Connecticut. Visit our Find a Location page to see the full list with addresses, phone numbers, and hours.",
  },
  {
    question: "Do you offer pickup and delivery?",
    answer:
      "Yes — complimentary pickup and delivery is available in select areas. Schedule your service online or call your local store directly to set up a recurring time that works for you.",
  },
  {
    question: "How do I contact customer service?",
    answer:
      "Visit our Contact page to reach the right team for your need — whether you're a retail client, wholesale partner, or franchise inquiry. We respond promptly during business hours.",
  },
  {
    question: "Is petrochemical-free dry cleaning safe for delicate fabrics like silk and cashmere?",
    answer:
      "Especially. Liquid silicone solvents do not swell or distort the protein structure of silk, wool, or cashmere. The result is preserved drape, retained sheen, and dye vibrancy — without the dryness or shrinkage that can come from perc.",
  },
  {
    question: "Will my clothes smell different from traditional dry cleaning?",
    answer:
      "Yes — in a good way. Petrochemical-free cleaning eliminates harsh chemical odors and leaves garments feeling fresh and neutral. Many of our clients tell us this is what made them switch.",
  },
  {
    question: "Can you handle wedding gown preservation?",
    answer:
      "Yes. Our bridal preservation includes gentle cleaning for delicate fabrics, stain removal, fabric protection, and archival-quality preservation packaging built to last decades.",
  },
  {
    question: "What about garments damaged by fire, water, or mold?",
    answer:
      "Our restoration division specializes in exactly this. Co-Founder Igor Madrit personally leads restoration operations, and we work directly with insurance providers when needed.",
  },
  {
    question: "Do you offer alterations and tailoring?",
    answer:
      "Yes — from simple hems and pant adjustments to suit refits, dress alterations, and zipper or button repairs. Our tailors are trained on couture and ready-to-wear pieces alike.",
  },
  {
    question: "What household items can you clean?",
    answer:
      "Beyond clothing we offer expert cleaning for oriental and area rugs, comforters, duvets, linens, draperies, and curtains.",
  },
  {
    question: "Do you offer wholesale or B2B services?",
    answer:
      "Yes. We work with hotels, healthcare facilities, fitness centers and spas, corporate offices, event companies, and other dry cleaners (white-label). Visit our Wholesale page or request a quote for tailored pricing.",
  },
  {
    question: "Are you a family-owned business?",
    answer:
      "Yes — GoGreen Dry Cleaners™ was founded in 2010 by Michael Koppy and Igor Madrit, and remains family-led. Several of our locations are recognized members of their local Chambers of Commerce.",
  },
];
