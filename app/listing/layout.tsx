import { AvatarButton, LogoButton } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-5 md:mx-60 mt-6">
      <header className="flex justify-center md:justify-between items-center border-b pb-3 mb-3">
        <LogoButton responsive={false} />
        <AvatarButton />
      </header>
      {children}
    </section>
  );
}
