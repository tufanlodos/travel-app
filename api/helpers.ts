import * as listings from "./listings.json";
import { ListingsResponse } from "./types";

const data = listings as ListingsResponse;

export function getCategories() {
  return data.categories;
}

export function getListings() {
  return data;
}
