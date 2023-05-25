import Image from "next/image";

export function LogoButton() {
  return (
    <button className="hidden md:block">
      <Image
        className="lg:hidden"
        src="/icon.png"
        alt="Logo"
        width={37}
        height={37}
        priority
      />
      <Image
        className="hidden lg:block"
        src="/logo-green.png"
        alt="Logo"
        width={180}
        height={37}
        priority
      />
    </button>
  );
}
