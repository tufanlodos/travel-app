"use client";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ButtonOutline } from "./ButtonOutline";
import { getCities } from "@/api";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");
  const guestCountParam = searchParams.get("guestCount");

  const cities = getCities();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGuestCount, setSelectedGuestCount] = useState(0);

  useEffect(() => {
    if (cityParam !== null) {
      setSelectedCity(cityParam);
    }

    if (guestCountParam !== null) {
      setSelectedGuestCount(Number(guestCountParam));
    }
  }, [cityParam, guestCountParam]);

  const onSearch = () => {
    if (selectedCity === "" && selectedGuestCount === 0) {
      setShowSearchModal(false);
      return;
    }

    const query: { city?: string; guestCount?: string } = {};
    if (selectedCity !== "") {
      query.city = selectedCity;
    }
    if (selectedGuestCount !== 0) {
      query.guestCount = selectedGuestCount.toString();
    }

    const path = `/search?${new URLSearchParams(query).toString()}`;
    router.push(path);
    setShowSearchModal(false);
    router.refresh();
  };

  const onClear = () => {
    setSelectedCity("");
    setSelectedGuestCount(0);
    router.push("/");
    setShowSearchModal(false);
    router.refresh();
  };

  return (
    <>
      <div
        className="py-2 px-4 border cursor-pointer rounded-full shadow-sm hover:shadow-md"
        onClick={() => setShowSearchModal(true)}
      >
        <div className="flex items-center px-2 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            className="w-4 h-4 stroke-black mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <div className="flex flex-col">
            <text className="text-sm px-2 font-semibold">
              {selectedCity === "" ? "Anywhere" : selectedCity}
            </text>
            <div className="flex items-center">
              <text className="text-sm pl-2 text-gray-500">Any date ·</text>
              <text className="text-sm pl-1 text-gray-500">
                {selectedGuestCount === 0
                  ? "Add guests"
                  : `${selectedGuestCount} guests`}
              </text>
            </div>
          </div>
        </div>
        <div className="hidden md:flex">
          <div className="flex items-center">
            <text className="text-sm px-2 font-semibold border-r">
              {selectedCity === "" ? "Anywhere" : selectedCity}
            </text>
            <text className="text-sm px-2 font-semibold border-r">
              Any date
            </text>
            <text
              className={`text-sm px-2 ${
                selectedGuestCount === 0 ? "text-gray-500" : "font-semibold"
              }`}
            >
              {selectedGuestCount === 0
                ? "Add"
                : `${selectedGuestCount} guests`}
            </text>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-primary"
          >
            <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {showSearchModal && (
        <Modal>
          {/*header*/}
          <div className="flex justify-between items-center p-5 border-b border-solid border-slate-200 rounded-t">
            <h1 className="text-3xl font-semibold">Find a place</h1>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowSearchModal(false)}
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
          <div className="relative p-6 flex-auto border-b border-solid border-slate-200">
            <h2 className="font-bold">Location</h2>
            <select
              className="border border-slate-200 rounded-md h-10"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="relative p-6 flex-auto border-b border-solid border-slate-200">
            <h2 className="font-bold">Date</h2>
            <div className="flex items-center">
              <div className="flex flex-col">
                <h6>Check in</h6>
                <input
                  type="date"
                  className="border border-slate-200 rounded-md h-10 mr-5"
                />
              </div>
              <div className="flex flex-col">
                <h6>Check out</h6>
                <input
                  type="date"
                  className="border border-slate-200 rounded-md h-10"
                />
              </div>
            </div>
          </div>
          <div className="relative p-6 flex-auto border-b border-solid border-slate-200">
            <h2 className="font-bold">Number of guests</h2>
            <div className="flex items-center">
              <button
                className="border border-slate-200 rounded-md w-20 h-10"
                onClick={() => {
                  if (selectedGuestCount > 0) {
                    setSelectedGuestCount(selectedGuestCount - 1);
                  }
                }}
              >
                -
              </button>
              <input
                type="number"
                className="border border-slate-200 rounded-md w-20 h-10 text-center"
                value={selectedGuestCount}
                onChange={(e) => {
                  if (
                    Number.isFinite(e.target.value) &&
                    Number(e.target.value) >= 0
                  ) {
                    setSelectedGuestCount(Number(e.target.value));
                  }
                }}
              />
              <button
                className="border border-slate-200 rounded-md w-20 h-10"
                onClick={() => setSelectedGuestCount(selectedGuestCount + 1)}
              >
                +
              </button>
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 rounded-b">
            <button
              className="mt-3 px-6 py-3 font-semibold"
              type="button"
              onClick={onClear}
            >
              Clear
            </button>
            <ButtonOutline onClick={onSearch}>Search</ButtonOutline>
          </div>
        </Modal>
      )}
    </>
  );
}
