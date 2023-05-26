import * as listings from "./listings.json";
import { Listing, ListingsResponse } from "./types";

const data = listings as ListingsResponse;

export function getCategories() {
  return data.categories;
}

export function getCities() {
  const cities = data.data.map((listing) => listing.info.location.city);
  return [...new Set(cities)];
}

export function getListing(id: string) {
  return data.data.find((listing) => listing.info.id === id);
}

export function getListings(city?: string, guestCount?: number) {
  const listingIds = data.data.map((listing) => listing.info.id);
  const uniqueListingIds = [...new Set(listingIds)];

  if (city === undefined && guestCount === undefined) {
    return uniqueListingIds.map((id) => getListing(id) as Listing);
  }

  return uniqueListingIds
    .map((id) => getListing(id) as Listing)
    .filter(
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
