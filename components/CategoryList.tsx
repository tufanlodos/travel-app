import { Category, getCategories } from "@/api";

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
  return (
    <div
      className={`flex flex-shrink-0 p-6 items-center justify-center mr-5 border cursor-pointer rounded-md w-[90px] h-[90px] text-center hover:border-black hover:shadow-sm ${
        selectedId === category.id ? "border-black" : ""
      }`}
      onClick={() => onClick(category.id)}
    >
      {category.title}
    </div>
  );
}
