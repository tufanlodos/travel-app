"use client";

import { getCities, getListings } from "@/api";
import { CategoryList, ListingItem, ListingsContainer } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const list = listings.filter((listing) =>
    selectedCategoryId === "" ? true : listing.category === selectedCategoryId
  );
  // TODO no result view if empty list

  return (
    <>
      <CategoryList
        selectedId={selectedCategoryId}
        onSelect={(id) => {
          if (id === selectedCategoryId) {
            setSelectedCategoryId("");
          } else {
            setSelectedCategoryId(id);
          }
        }}
      />
      <section className="px-10">
        <ListingsContainer>
          {list.map((listing) => (
            <ListingItem key={listing.ref} item={listing} />
          ))}
        </ListingsContainer>
      </section>
    </>
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
