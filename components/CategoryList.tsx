"use client";

import { Category, getCategories } from "@/api";
import { useEffect, useState } from "react";

type Props = {
  selectedId: Category["id"];
  onSelect: (id: Category["id"]) => void;
};

export function CategoryList({ selectedId, onSelect }: Props) {
  const categories = getCategories();

  return (
    <div className="flex items-center p-5 md:p-10 overflow-x-auto no-scrollbar">
      {categories.map((category) => (
        <ListItem
          key={category.id}
          category={category}
          selectedId={selectedId}
          onClick={(id) => onSelect(id)}
        />
      ))}
    </div>
  );
}

type ListItemProps = {
  category: Category;
  selectedId: Category["id"];
  onClick: (id: Category["id"]) => void;
};

function ListItem({ category, selectedId, onClick }: ListItemProps) {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 750);
  }, []);

  return (
    <div
      className={`flex flex-shrink-0 p-4 items-center justify-center mr-5 border-b cursor-pointer h-[50px] text-center hover:border-b-black hover:shadow-sm ${
        selectedId === category.id ? "border-b-black" : ""
      } ${showAnimation ? "animate-pulse" : ""}`}
      onClick={() => onClick(category.id)}
    >
      {category.title}
    </div>
  );
}
