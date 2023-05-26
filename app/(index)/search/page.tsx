"use client";

import { getCities, getListings } from "@/api";
import { ListingItem, ListingsContainer } from "@/components";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");
  const guestCountParam = searchParams.get("guestCount");
  const { city, guestCount } = validateParams(cityParam, guestCountParam);
  const listings = getListings(city, Number(guestCount));

  if (listings.length === 0) {
    // TODO: no result view
    return null;
  }

  return (
    <section className="px-10">
      <ListingsContainer>
        {listings.map((listing) => (
          <ListingItem key={listing.ref} item={listing} />
        ))}
      </ListingsContainer>
    </section>
  );
}

function validateParams(
  cityParam: string | null,
  guestCountParam: string | null
) {
  let city;
  let guestCount;

  if (cityParam) {
    const cities = getCities();
    city = cities.find(
      (city) => city.toLowerCase() === decodeURI(cityParam).toLowerCase()
    );
  }

  if (guestCountParam) {
    guestCount = Number.isFinite(Number(guestCountParam))
      ? Number(guestCountParam)
      : undefined;
  }

  return { city, guestCount };
}
