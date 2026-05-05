import locationsJson from "../../content/locations.json";

export type LocationAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type Location = {
  slug: string;
  name: string;
  type: "storefront" | "van-route";
  address: LocationAddress | null;
  phone: string | null;
  maps_url: string | null;
  rating: number | null;
  review_count: number | null;
};

export type Region = {
  state: "FL" | "NY" | "CT";
  label: string;
  stores: Location[];
};

export type LocationsData = {
  aggregate: {
    stores_with_ratings: number;
    total_reviews: number;
    weighted_average_rating: number;
    display_copy: string;
  };
  regions: Region[];
};

export const locationsData = locationsJson as unknown as LocationsData;

export const allLocations: Location[] = locationsData.regions.flatMap((r) => r.stores);

export function getLocation(slug: string): Location | undefined {
  return allLocations.find((s) => s.slug === slug);
}

export function getRegionForSlug(slug: string): Region | undefined {
  return locationsData.regions.find((r) => r.stores.some((s) => s.slug === slug));
}
