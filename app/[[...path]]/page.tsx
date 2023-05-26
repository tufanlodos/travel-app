"use client";

import { getCities, getListings } from "@/api";
import { ListingItem, ListingsContainer } from "@/components";
import { useSearchParams } from "next/navigation";

type Props = {
  params: { path: string[] };
};

export default function IndexPage({ params }: Props) {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");
  const guestCountParam = searchParams.get("guestCount");
  const { city, guestCount } = validateParams(cityParam, guestCountParam);
  const applySearch = params.path !== undefined && params.path[0] === "search";
  const listings = getListings(
    applySearch && city !== undefined ? city : undefined,
    applySearch && guestCount !== undefined ? Number(guestCount) : undefined
  );

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
