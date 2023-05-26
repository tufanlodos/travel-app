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
  // selected => border-b-4 border-b-black
  return (
    <div className="flex flex-shrink-0 p-6 items-center justify-center mr-5 border cursor-pointer rounded-md w-[90px] h-[90px] text-center hover:border-black hover:shadow-sm">
      {category.title}
    </div>
  );
}
