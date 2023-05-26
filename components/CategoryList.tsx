import { Category, getCategories } from "@/api";

export function CategoryList() {
  const categories = getCategories();

  return (
    <div className="flex items-center p-5 md:p-10 overflow-x-auto no-scrollbar">
      {categories.map((category) => (
        <ListItem key={category.id} category={category} />
      ))}
    </div>
  );
}

type ListItemProps = {
  category: Category;
};

function ListItem({ category }: ListItemProps) {
  // TODO: use category id in client side to filter
  return (
    <div className="flex flex-shrink-0 items-center justify-center mr-5 border cursor-pointer rounded-md hover:shadow-sm w-[90px] h-[90px] text-center">
      {category.title}
    </div>
  );
}
