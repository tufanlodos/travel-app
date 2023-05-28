import Image from "next/image";
import Link from "next/link";

type Props = {
  responsive?: boolean;
};

export function LogoButton({ responsive = true }: Props) {
  if (!responsive) {
    return (
      <Link className="cursor-pointer" href="/">
        <Image
          src="/logo-green.png"
          alt="Logo"
          width={180}
          height={40}
          priority
        />
      </Link>
    );
  }

  return (
    <Link className="hidden md:block cursor-pointer" href="/">
      <Image
        className="lg:hidden"
        src="/icon.png"
        alt="Logo"
        width={40}
        height={40}
        priority
      />
      <Image
        className="hidden lg:block"
        src="/logo-green.png"
        alt="Logo"
        width={180}
        height={40}
        priority
      />
    </Link>
  );
}
