export function ListingsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pb-5 md:pb-10">
      {children}
    </div>
  );
}
