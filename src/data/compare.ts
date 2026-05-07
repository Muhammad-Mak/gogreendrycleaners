export type CompareCell = "yes" | "no" | "partial";

export type CompareRow = {
  /** Stable id used as the table row's anchor — highlight cards link
   * to `#row-${id}` to scroll the user to the matching row. */
  id: string;
  feature: string;
  description: string;
  /** One value per method, in the order METHODS is declared. */
  values: CompareCell[];
};

export const METHODS = [
  "GreenEarth",
  "Perc",
  "Hydrocarbon",
  "SystemK4",
  "Sensene",
  "Intense",
  "HiGlo",
  "Wet Cleaning",
  "Liquid CO₂",
];

/** Index of GreenEarth (the column we highlight). */
export const HIGHLIGHT_INDEX = 0;

export const COMPARISON: CompareRow[] = [
  { id: "perc-free",            feature: "Perc-free",                description: "No PERC solvent",            values: ["yes","no","yes","yes","yes","yes","yes","yes","yes"] },
  { id: "petroleum-free",       feature: "Petroleum-free",           description: "No petroleum solvent",       values: ["yes","yes","no","yes","yes","no","yes","yes","yes"] },
  { id: "silicone-based",       feature: "Silicone-based",           description: "Liquid silicone care",       values: ["yes","no","no","no","no","no","no","no","no"] },
  { id: "no-water-immersion",   feature: "No water immersion",       description: "Avoids water swelling",      values: ["yes","yes","yes","yes","yes","yes","yes","no","yes"] },
  { id: "chemically-inert",     feature: "Chemically inert",         description: "Less fabric reaction",       values: ["yes","no","partial","no","partial","no","partial","no","partial"] },
  { id: "gentle-delicates",     feature: "Gentle on delicates",      description: "Safer fine fabrics",         values: ["yes","no","partial","partial","partial","partial","partial","partial","partial"] },
  { id: "protects-shape",       feature: "Low shrinkage risk",       description: "Helps preserve fit",         values: ["yes","yes","yes","yes","yes","yes","yes","partial","yes"] },
  { id: "protects-color",       feature: "Low color-fade risk",      description: "Helps protect color",        values: ["yes","no","partial","partial","partial","no","partial","partial","partial"] },
  { id: "trim-friendly",        feature: "Better for trims",         description: "Beads, buttons, details",    values: ["yes","no","partial","partial","partial","partial","partial","partial","partial"] },
  { id: "structured-care",      feature: "Structured garment care",  description: "Better suits & coats",       values: ["yes","partial","yes","yes","yes","yes","yes","partial","yes"] },
  { id: "oil-stain-capable",    feature: "Oil-stain capable",        description: "Handles oily soils",         values: ["yes","yes","yes","yes","yes","yes","partial","partial","partial"] },
  { id: "no-harsh-smell",       feature: "No harsh smell",           description: "No chemical odor",           values: ["yes","no","partial","partial","no","partial","partial","yes","yes"] },
  { id: "skin-sensitive",       feature: "Skin-sensitive friendly",  description: "Better for sensitivities",   values: ["yes","no","partial","partial","partial","no","partial","yes","yes"] },
  { id: "patented-antiviral",   feature: "Patented antiviral",       description: "GreenEarth patent",          values: ["yes","no","no","no","no","no","no","no","no"] },
];

/** The strongest selling-point categories shown above the full table.
 * `rowId` matches a CompareRow.id so clicking the highlight scrolls to
 * the corresponding row in the table. */
export const HIGHLIGHTS: { title: string; description: string; rowId: string }[] = [
  { title: "Perc-Free",                  description: "No PERC solvent",                rowId: "perc-free" },
  { title: "Petroleum-Free",             description: "No petroleum solvent",           rowId: "petroleum-free" },
  { title: "Silicone-Based",             description: "Liquid silicone care",           rowId: "silicone-based" },
  { title: "No Water Immersion",         description: "Avoids water swelling",          rowId: "no-water-immersion" },
  { title: "Gentle on Delicates",        description: "Safer fine fabrics",             rowId: "gentle-delicates" },
  { title: "Protects Color",             description: "Less fading risk",               rowId: "protects-color" },
  { title: "Protects Shape",             description: "Helps preserve fit",             rowId: "protects-shape" },
  { title: "Trim-Friendly",              description: "Better with beads & buttons",    rowId: "trim-friendly" },
  { title: "Structured Garment Care",    description: "Better suits & coats",           rowId: "structured-care" },
  { title: "No Harsh Smell",             description: "No chemical odor",               rowId: "no-harsh-smell" },
  { title: "Skin-Sensitive Friendly",    description: "Better for sensitivities",       rowId: "skin-sensitive" },
  { title: "Patented Antiviral",         description: "GreenEarth patent",              rowId: "patented-antiviral" },
];
