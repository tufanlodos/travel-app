import { AvatarButton, LogoButton, SearchButton } from "@/components";
import { FooterText } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 bg-white">
        <nav className="flex justify-center md:justify-between items-center border-b px-10 py-5">
          <LogoButton />
          <SearchButton />
          <AvatarButton />
        </nav>
      </header>
      {children}
      <footer className="px-10 sticky bottom-0 bg-white">
        <FooterText />
      </footer>
    </>
  );
}
