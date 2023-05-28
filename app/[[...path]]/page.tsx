"use client";

import { getCities, getListings } from "@/utils";
import { CategoryList, ListingItem, ListingsContainer } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  params: { path: string[] };
};

export default function IndexPage({ params }: Props) {
  const searchParams = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const cityParam = searchParams?.get("city") ?? null;
  const guestCountParam = searchParams?.get("guestCount") ?? null;
  const { city, guestCount } = validateParams(cityParam, guestCountParam);
  const applySearch = params.path !== undefined && params.path[0] === "search";
  const list = getListings(
    applySearch && city !== undefined ? city : undefined,
    applySearch && guestCount !== undefined ? Number(guestCount) : undefined
  ).filter((listing) =>
    selectedCategoryId === "" ? true : listing.category === selectedCategoryId
  );

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
          {list.length === 0 ? (
            <span>No result</span>
          ) : (
            list.map((listing, index) => (
              <ListingItem key={`${listing.ref}-${index}`} item={listing} />
            ))
          )}
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
