import {
  AvatarButton,
  LogoButton,
  SearchButton,
  CategoryList,
} from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0">
        <nav className="flex justify-center md:justify-between items-center border-b px-10 py-5">
          <LogoButton />
          <SearchButton />
          <AvatarButton />
        </nav>
        <CategoryList />
      </header>
      {children}
    </>
  );
}
