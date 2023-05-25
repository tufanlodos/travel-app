import { AvatarMenu, LogoButton, SearchBar, CategoryList } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <nav className="flex justify-between items-center">
          <LogoButton />
          <SearchBar />
          <AvatarMenu />
        </nav>
        <CategoryList />
      </header>
      {children}
    </>
  );
}
