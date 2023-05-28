"use client";

import Image from "next/image";
import { Image as ImageType, getBlurDataURL, getListing } from "@/utils";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

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

  const onOpenGallery = (index: number) => {
    setActiveImageIndex(index);
    setShowGalleryModal(true);
  };

  return (
    <>
      <title>{item.info.title}</title>
      <h1 className="text-2xl font-semibold mb-3 md:mb-0">{item.info.title}</h1>
      <div className="hidden md:flex justify-between items-center mb-6">
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
            <span className="text-sm font-semibold">
              {item.info.ratings.value} ·
            </span>
          </span>
          <span className="text-sm font-semibold underline cursor-pointer">
            {item.info.visibleReviewCount} reviews
          </span>
          <span className="mx-2">·</span>
          {item.info.host !== undefined && item.info.host.isSuperhost && (
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-black"
              >
                <path
                  fillRule="evenodd"
                  d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal mx-2"> Superhost · </span>
            </span>
          )}
          <span className="text-sm font-semibold underline cursor-pointer">
            {item.info.location.city}, {item.info.location.country.title}
          </span>
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
          <span className="text-sm font-semibold underline cursor-pointer mr-5">
            Share
          </span>
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
          <span className="text-sm font-semibold underline cursor-pointer">
            Save
          </span>
        </div>
      </div>
      <div className="md:hidden mb-6 relative">
        <Image
          src={item.info.mainImage.url}
          alt={item.info.title}
          width={item.info.mainImage.width}
          height={item.info.mainImage.height}
          className="aspect-square rounded-md w-full h-full cursor-pointer"
          placeholder="blur"
          blurDataURL={getBlurDataURL(
            item.info.mainImage.width,
            item.info.mainImage.height
          )}
          onClick={() => onOpenGallery(0)}
        />
        <GalleryButton
          images={item.info.images.data}
          activeImageIndex={activeImageIndex}
          setActiveImageIndex={setActiveImageIndex}
          showGalleryModal={showGalleryModal}
          setShowGalleryModal={setShowGalleryModal}
        />
      </div>
      <div className="hidden md:grid grid-rows-2 grid-cols-4 gap-4 mb-6 rounded-md relative">
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
              className="aspect-square rounded-md w-full h-full cursor-pointer"
              placeholder="blur"
              blurDataURL={getBlurDataURL(image.width, image.height)}
              onClick={() => onOpenGallery(index)}
            />
          </div>
        ))}
        <GalleryButton
          images={item.info.images.data}
          activeImageIndex={activeImageIndex}
          setActiveImageIndex={setActiveImageIndex}
          showGalleryModal={showGalleryModal}
          setShowGalleryModal={setShowGalleryModal}
        />
      </div>
      <div className="flex flex-1 justify-start items-start">
        <div className="flex flex-5">
          <div className="flex flex-col md:mr-12">
            <div className="flex justify-between items-center border-b pb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Entire {item.info.type}{" "}
                  {item.info.host !== undefined
                    ? `by ${item.info.host.name}`
                    : `in ${item.info.location.city}`}
                </h2>
                {item.info.details.data.map((detail, index) => (
                  <span key={detail.type}>
                    {index !== 0 ? " · " : ""}
                    {detail.value} {detail.type}
                  </span>
                ))}
              </div>
              <div className="relative cursor-pointer">
                {item.info.host !== undefined && item.info.host.isSuperhost && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 absolute bottom-0 fill-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {item.info.host !== undefined && (
                  <Image
                    src={item.info.host.avatar.url}
                    alt={item.info.host.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(
                      item.info.host.avatar.width,
                      item.info.host.avatar.height
                    )}
                  />
                )}
              </div>
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
                      <span>{arrangement.subTitle}</span>
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
                  <span
                    key={amenity.title}
                    className={!amenity.available ? "line-through" : ""}
                  >
                    • {amenity.title}
                  </span>
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
                          <span className="text-lg font-semibold">
                            {groupName}
                          </span>
                        </div>
                        {amenityGroups[groupName].map((amenity) => (
                          <div key={amenity.title}>
                            <span
                              className={
                                amenity.available ? "" : "line-through"
                              }
                            >
                              {amenity.title}
                            </span>
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
              <span>
                {item.info.location.city}, {item.info.location.country.title}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-3 sticky top-5">
          <div className="flex flex-col shadow-lg border rounded-lg p-5 min-w-[300px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl font-semibold mr-1">
                  {item.info.currency.symbol}
                  {item.info.price}
                </span>
                <span className="font-light">night</span>
              </div>
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
                  <span className="text-sm font-semibold">
                    {item.info.ratings.value} ·
                  </span>
                </span>
                <span className="text-sm font-semibold underline cursor-pointer text-gray-500">
                  {item.info.visibleReviewCount} reviews
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 mb-4">
              <div className="p-4 border rounded-md">
                <div className="flex flex-col">
                  <span className="font-semibold">Check in</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <div className="flex flex-col">
                  <span className="font-semibold">Check out</span>
                  <span>
                    {new Date(
                      new Date().getTime() + 3 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="col-span-2 p-4 border rounded-md">
                <span>Max. {item.info.maxGuestCapacity} Guests</span>
              </div>
            </div>
            <button className="bg-primary rounded-md py-3 px-7 text-white font-bold hover:bg-primary-light">
              Reserve
            </button>
            <span className="font-light text-center mt-4">
              You won’t be charged yet
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between md:hidden sticky bottom-0 bg-white py-2">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="font-semibold text-md mr-1">
              {item.info.currency.symbol}
              {item.info.price}
            </span>
            <span className="font-light text-md">night</span>
          </div>
          <span className="underline">Jun 6-8</span>
        </div>
        <button className="bg-primary rounded-md py-1 px-6 text-white font-bold hover:bg-primary-light">
          Reserve
        </button>
      </div>
    </>
  );
}

type GalleryButtonProps = {
  images: ImageType[];
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  showGalleryModal: boolean;
  setShowGalleryModal: (show: boolean) => void;
};

const GalleryButton = ({
  images,
  activeImageIndex,
  setActiveImageIndex,
  showGalleryModal,
  setShowGalleryModal,
}: GalleryButtonProps) => {
  const [loading, setLoading] = useState(false);
  const src = images[activeImageIndex].url;

  return (
    <>
      <button
        className="flex items-center absolute bottom-3 right-3 bg-white border border-black rounded-md px-2 py-1"
        onClick={() => {
          setActiveImageIndex(0);
          setShowGalleryModal(true);
        }}
      >
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
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>

        <span>Show all photos</span>
      </button>
      {showGalleryModal && (
        <Modal>
          {/*header*/}
          <div className="flex justify-end items-center p-5 border-b border-slate-200 rounded-t">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowGalleryModal(false)}
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
          <div className="p-5 min-w-[300px]">
            <Image
              src={src}
              alt={`${activeImageIndex + 1}. image`}
              width={300}
              height={300}
              className={`rounded-sm h-full w-full aspect-square object-contain ${
                loading ? "animate-pulse" : ""
              }`}
              placeholder="blur"
              blurDataURL={getBlurDataURL(300, 300)}
              onLoad={() => {
                setLoading(false);
              }}
            />
          </div>
          {/*footer*/}
          <div className="flex justify-between items-center p-5">
            <button
              className="border px-4 py-2 rounded-md"
              onClick={() => {
                if (activeImageIndex > 0) {
                  setLoading(true);
                  setActiveImageIndex(activeImageIndex - 1);
                }
              }}
            >
              Prev
            </button>
            <span>
              {activeImageIndex + 1} / {images.length}
            </span>
            <button
              className="border px-4 py-2 rounded-md"
              onClick={() => {
                if (activeImageIndex < images.length - 1) {
                  setLoading(true);
                  setActiveImageIndex(activeImageIndex + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
