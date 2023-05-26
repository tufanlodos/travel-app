"use client";

import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/api";
import { useEffect, useState } from "react";

type Props = { item: Listing };

export function ListingItem({ item }: Props) {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 750);
  }, []);

  return (
    <Link href={`/listing/${item.info.id}`} target="_blank">
      <div
        className={`flex flex-col mr-5 ${
          showAnimation ? "animate-pulse" : ""
        } w-[300px]`}
      >
        <Image
          src={item.info.mainImage.url}
          alt={item.info.title}
          width={300}
          height={300}
          className="rounded-lg aspect-square"
        />
        <div className="flex justify-between items-center mt-2">
          <text className="text-base font-semibold">
            {item.info.location.city}, {item.info.location.country.title}
          </text>
          <span className="flex items-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-black"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <text className="text-sm font-semibold">
              {item.info.ratings.value}
            </text>
          </span>
        </div>
        <span>
          <text className="text-base font-semibold">
            {item.info.currency.symbol}
            {item.info.price}
          </text>
          <text className="font-light"> night</text>
        </span>
      </div>
    </Link>
  );
}
