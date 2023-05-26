"use client";

import Image from "next/image";
import { getListing } from "@/api";
import { ButtonOutline, Modal } from "@/components";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function ListingPage({ params }: Props) {
  const router = useRouter();
  const { id } = params;
  const item = getListing(id);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);

  if (!item) {
    router.push("/404");
    router.refresh();
    return;
  }

  const amenityGroups = item.info.amenities.data.reduce(
    (acc: { [key: string]: (typeof amenity)[] }, amenity) => {
      if (!acc[amenity.group]) {
        acc[amenity.group] = [];
      }
      acc[amenity.group].push(amenity);
      return acc;
    },
    {}
  );

  return (
    <>
      <title>{item.info.title}</title>
      <section className="mx-60 mt-6">
        <h1 className="text-2xl font-semibold">{item.info.title}</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
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
                {item.info.ratings.value} ·
              </text>
            </span>
            <text className="text-sm font-semibold underline cursor-pointer">
              {item.info.visibleReviewCount} reviews
            </text>
            <span className="mx-2">·</span>
            <text className="text-sm font-semibold underline cursor-pointer">
              {item.info.location.city}, {item.info.location.country.title}
            </text>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-4 h-4 stroke-black mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            <text className="text-sm font-semibold underline cursor-pointer mr-5">
              Share
            </text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-4 h-4 stroke-black mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <text className="text-sm font-semibold underline cursor-pointer">
              Save
            </text>
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-4 gap-4 mb-6 rounded-md">
          {item.info.images.data.slice(0, 5).map((image, index) => (
            <div
              key={image.url}
              className={index === 0 ? "row-span-2 col-span-2" : ""}
            >
              <Image
                src={image.url}
                alt={item.info.title}
                width={image.width}
                height={image.height}
                className="aspect-square rounded-md w-full h-full"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-1 justify-start items-center">
          <div className="flex flex-5">
            <div className="flex flex-col mr-12">
              <div className="flex justify-between items-center border-b pb-6">
                <div>
                  <h2 className="text-xl font-semibold">
                    Entire {item.info.type} by {item.info.host.name}
                  </h2>
                  {item.info.details.data.map((detail, index) => (
                    <text key={detail.type}>
                      {index !== 0 ? " · " : ""}
                      {detail.value} {detail.type}
                    </text>
                  ))}
                </div>
                <Image
                  src={item.info.host.avatar.url}
                  alt={item.info.host.name}
                  width={50}
                  height={50}
                  className="rounded-full cursor-pointer"
                  loading="eager"
                />
              </div>
              <p className="mt-6 border-b pb-6">{item.info.description}</p>
              {item.info.sleepingArrangements.count > 0 && (
                <div className="flex flex-col items-start border-b py-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Where you’ll sleep
                  </h2>
                  <div className="flex items-center">
                    {item.info.sleepingArrangements.data.map((arrangement) => (
                      <div
                        key={arrangement.title}
                        className="rounded-md border p-6 mr-3"
                      >
                        <h3 className="font-semibold">{arrangement.title}</h3>
                        <text>{arrangement.subTitle}</text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col items-start border-b py-6">
                <h2 className="text-xl font-semibold mb-2">
                  What this place offers
                </h2>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {item.info.amenities.data.slice(0, 10).map((amenity) => (
                    <text
                      key={amenity.title}
                      className={!amenity.available ? "line-through" : ""}
                    >
                      • {amenity.title}
                    </text>
                  ))}
                </div>
                <ButtonOutline onClick={() => setShowAmenitiesModal(true)}>
                  Show all {item.info.amenities.count} amenities
                </ButtonOutline>
                {showAmenitiesModal && (
                  <Modal>
                    {/*header*/}
                    <div className="flex justify-between items-center p-5 border-b border-slate-200 rounded-t">
                      <h1 className="text-3xl font-semibold">
                        What this place offers
                      </h1>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-left text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowAmenitiesModal(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="w-6 h-6 stroke-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto border-b border-slate-200 h-96 overflow-scroll">
                      {Object.keys(amenityGroups).map((groupName) => (
                        <div key={groupName} className="mb-5">
                          <div>
                            <text className="text-lg font-semibold">
                              {groupName}
                            </text>
                          </div>
                          {amenityGroups[groupName].map((amenity) => (
                            <div key={amenity.title}>
                              <text
                                className={
                                  amenity.available ? "" : "line-through"
                                }
                              >
                                {amenity.title}
                              </text>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </Modal>
                )}
              </div>
              <div className="flex flex-col items-start border-b py-6">
                <h2 className="text-xl font-semibold mb-2">Where you’ll be</h2>
                <text>
                  {item.info.location.city}, {item.info.location.country.title}
                </text>
              </div>
            </div>
          </div>
          <div className="flex flex-3">
            <div className="flex flex-col shadow-lg border rounded-lg p-5 min-w-[300px]">
              <button className="bg-primary rounded-md py-3 px-7 text-white font-bold hover:bg-primary-light">
                Reserve
              </button>
              <text className="font-light text-center mt-4">
                You won’t be charged yet
              </text>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
