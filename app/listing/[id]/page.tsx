import Image from "next/image";
import { getListing } from "@/api";

export const metadata = {
  title: "Listing Page",
};

type Props = {
  params: { id: string };
};

export default function ListingPage({ params }: Props) {
  const { id } = params;
  const item = getListing(id);

  if (!item) {
    // TODO: 404 page
    return null;
  }

  return (
    <section className="mx-24 mt-4">
      <h1 className="text-2xl font-semibold">{item.info.title}</h1>
      <div className="flex justify-between items-center mb-4">
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
      <Image
        src={item.info.mainImage.url}
        alt={item.info.title}
        width={item.info.mainImage.width}
        height={item.info.mainImage.height}
        className="rounded-md"
      />
    </section>
  );
}
