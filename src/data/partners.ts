export type Partner = {
  name: string;
  logo: string;
  width: number;
  height: number;
};

/**
 * Trust strip — partners and clients displayed on the source site's About page.
 * Used as a "trusted by" logo bar. Two unidentified logos from the source
 * (Unknown.png, Unknown-1.png) are excluded pending identification.
 */
export const partners: Partner[] = [
  { name: "Marriott", logo: "/images/partners/marriott.jpg", width: 160, height: 60 },
  { name: "Hyatt", logo: "/images/partners/hyatt.png", width: 160, height: 60 },
  { name: "Hilton Stamford", logo: "/images/partners/hilton-stamford.png", width: 160, height: 60 },
  { name: "Brightline", logo: "/images/partners/brightline.png", width: 160, height: 60 },
  { name: "Greystar", logo: "/images/partners/greystar.png", width: 160, height: 60 },
  { name: "Lincoln", logo: "/images/partners/lincoln.png", width: 160, height: 60 },
  { name: "BLT", logo: "/images/partners/blt.png", width: 160, height: 60 },
  { name: "Spinnaker", logo: "/images/partners/spinnaker.jpg", width: 160, height: 60 },
  { name: "Palm Beach Dramaworks", logo: "/images/partners/dramaworks.jpg", width: 160, height: 60 },
  { name: "Habitat for Humanity Greater Palm Beach County", logo: "/images/partners/greater-pbc.png", width: 160, height: 60 },
  { name: "Palm Beach Chamber of Commerce", logo: "/images/partners/pb-chamber.png", width: 160, height: 60 },
  { name: "Florida League of Cities", logo: "/images/partners/login.png", width: 160, height: 60 },
];
