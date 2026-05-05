export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  market?: string;
  group: "founder" | "leadership" | "mascot";
  shortBio: string;
  fullBio: string[];
  image?: string;
};

export const team: TeamMember[] = [
  {
    slug: "michael-koppy",
    name: "Michael Koppy",
    role: "Co-Founder & CEO",
    market: "Florida Market",
    group: "founder",
    shortBio:
      "Seasoned entrepreneur and business strategist with over 20 years leading growth and operations.",
    fullBio: [
      "Michael Koppy is a seasoned entrepreneur and business strategist with over 20 years of experience leading growth and operations across multiple industries. Formerly Executive Vice President and Senior Partner at Financial Recovery Strategies, Michael played a key role in helping Fortune 500 clients recover over $100 million in settlements through data-driven, client-focused solutions.",
      "Now as Co-Founder and CEO of GoGreen Dry Cleaners™, Michael brings that same strategic vision to the eco-conscious garment care space — elevating the brand as a premium, sustainability-driven service for high-end clientele. His leadership continues to drive expansion while maintaining a strong commitment to quality, community, and innovation.",
      "Michael also serves on the Executive Board of Directors for Tafer Hospitality & ResortCom.",
    ],
    image: "/images/about/team-1.jpeg",
  },
  {
    slug: "igor-madrit",
    name: "Igor Madrit",
    role: "Co-Founder & Partner",
    market: "New York and Connecticut Market",
    group: "founder",
    shortBio:
      "More than 25 years of expertise in high-end garment care and operational leadership.",
    fullBio: [
      "Igor Madrit is a seasoned industry expert with more than 25 years of experience in high-end garment care and operational leadership. As a founding partner of GoGreen Dry Cleaners™, Igor has played a central role in building the company's reputation for quality, integrity, and sustainable innovation.",
      "In addition to overseeing day-to-day operations, Igor leads the GoGreen restoration division, providing specialized services for garments affected by fire, water, and mold. His commitment to precision, care, and client satisfaction continues to shape the brand's elevated service experience and long-standing customer trust.",
    ],
    image: "/images/about/team-2.jpeg",
  },
  {
    slug: "paige-koppy",
    name: "Paige Koppy",
    role: "Chief Operating Officer",
    group: "leadership",
    shortBio:
      "Leads day-to-day operations and team performance across all locations.",
    fullBio: [
      "Paige Koppy is the Chief Operating Officer of GoGreen Dry Cleaners™, where she leads day-to-day operations, team performance, and service excellence across all locations. With a background as a high-level executive assistant and strategic operations lead, Paige brings a unique blend of precision, foresight, and leadership to the organization.",
      "She was instrumental in launching GoGreen's Florida expansion and establishing the operational systems that scale with it. Her commitment to quality, consistency, and team culture has been key in positioning GoGreen as a trusted, upscale brand in eco-friendly garment care.",
    ],
  },
  {
    slug: "kevin-van-rensburg",
    name: "Kevin Van Rensburg",
    role: "Vice President of Operations",
    group: "leadership",
    shortBio:
      "World-class hospitality background; oversees quality control across all locations.",
    fullBio: [
      "Originally from South Africa, Kevin Van Rensburg brings a world-class hospitality background and an unwavering commitment to excellence to his role as Vice President of Operations. With leadership experience in luxury service environments — including Nobu, Cape Town, and prestigious country clubs across Florida — Kevin has a sharp eye for quality and guest experience.",
      "Since the launch of GoGreen Dry Cleaners™ in Florida, Kevin has played a pivotal role in shaping the company's operational standards and customer-centric culture. He oversees quality control across all locations, ensuring every service reflects the brand's elevated standards.",
    ],
  },
  {
    slug: "jeff-connors",
    name: "Jeff Connors",
    role: "Director of Technical Operations",
    group: "leadership",
    shortBio:
      "Over 36 years of leadership in operations, equipment management, and multi-site service strategy.",
    fullBio: [
      "Jeff Connors brings over 36 years of leadership in operations, equipment management, and multi-site service strategy to his role as Director of Technical Operations. Before joining GoGreen, Jeff served as Vice President of Operations at Mr. Sparkle Car Wash, where he helped grow the company from four to fourteen locations and earned a reputation as a hands-on, highly respected leader.",
      "At GoGreen, Jeff oversees the performance and maintenance of all machinery and equipment across locations, leading with a proactive approach to problem-solving and system optimization. His attention to detail, fairness, and commitment to doing the job right continue to elevate operations and set a high standard for quality and reliability.",
    ],
  },
  {
    slug: "petra-koppy",
    name: "Petra Koppy",
    role: "Chief Puppy Officer",
    group: "mascot",
    shortBio: "Morale booster, greeter, and four-legged mascot.",
    fullBio: [
      "Petra Koppy may not handle garments, but she's an essential part of the GoGreen family. As our official morale booster, greeter, and four-legged mascot, Petra brings warmth, loyalty, and tail-wagging charm to every team meeting and storefront visit.",
      "Whether she's lounging near the front desk or making surprise cameos on delivery days, Petra reminds us that the best service starts with heart.",
    ],
  },
];

export const founders = team.filter((m) => m.group === "founder");
export const leadership = team.filter((m) => m.group === "leadership");
export const mascot = team.filter((m) => m.group === "mascot");
