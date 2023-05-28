export type Category = {
  id: string;
  type: string;
  title: string;
};

export type Image = {
  url: string;
  width: number;
  height: number;
  mimeType: string;
  orientation: string;
  aspectRatio: number;
  type: string;
};

export type Host = {
  name: string;
  avatar: Image;
  isSuperhost: boolean;
};

export type Country = {
  code: string;
  title: string;
};
export type Location = {
  lat: number;
  long: number;
  address: string;
  city: string;
  country: Country;
  zip: string;
};

export type Ratings = {
  accuracy: number;
  checkin: number;
  cleanliness: number;
  communication: number;
  location: number;
  value: number;
  guestSatisfactionOverall: number;
};

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type Amenity = {
  group: string;
  available: boolean;
  title: string;
  type: string;
};
export type ListingAmenity = {
  type: string;
  data: Amenity[];
  count: number;
};
export type Detail = {
  type: string;
  value: number;
};
export type ListingDetail = {
  type: string;
  data: Detail[];
  count: number;
};

export type ListingImage = {
  type: string;
  data: Image[];
  count: number;
};

export type Arrangement = {
  title: string;
  subTitle: string;
  icons: string[];
};
export type ListingSleepingArrangement = {
  type: string;
  data: Arrangement[];
  count: number;
};

export type ListingInfo = {
  id: string;
  title: string;
  description: string;
  type: string;
  images: ListingImage;
  details: ListingDetail;
  mainImage: Image;
  amenities: ListingAmenity;
  location: Location;
  ratings: Ratings;
  visibleReviewCount: number;
  available: boolean;
  price: number;
  currency: Currency;
  sleepingArrangements: ListingSleepingArrangement;
  host?: Host;
  maxGuestCapacity?: number;
};

export type Listing = {
  ref: string;
  category?: Category["id"];
  info: ListingInfo;
};

export type ListingsResponse = {
  source: string;
  type: string;
  categories: Category[];
  data: Listing[];
  count: number;
};
