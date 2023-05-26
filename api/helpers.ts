import * as listings from "./listings.json";
import { ListingsResponse } from "./types";

const data = listings as ListingsResponse;

export function getCategories() {
  return data.categories;
}

export function getCities() {
  return data.data.map((listing) => listing.info.location.city);
}

export function getListings(city?: string, guestCount?: number) {
  if (city === undefined && guestCount === undefined) {
    return data.data;
  }

  return data.data.filter(
    (listing) =>
      listing.info.available &&
      (city === undefined
        ? true
        : listing.info.location.city.toLowerCase() === city.toLowerCase()) &&
      (guestCount === undefined
        ? true
        : listing.info.maxGuestCapacity !== undefined &&
          listing.info.maxGuestCapacity >= guestCount)
  );
}

export function getListing(id: string) {
  return data.data.find((listing) => listing.info.id === id);
}
