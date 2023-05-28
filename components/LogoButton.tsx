import Image from "next/image";
import Link from "next/link";
import logoGreen from "../public/logo-green.png";
import icon from "../public/icon.png";

type Props = {
  responsive?: boolean;
};

export function LogoButton({ responsive = true }: Props) {
  if (!responsive) {
    return (
      <Link className="cursor-pointer" href="/">
        <Image
          src={logoGreen}
          alt="Logo"
          width={180}
          height={40}
          priority
          placeholder="blur"
        />
      </Link>
    );
  }

  return (
    <Link className="hidden md:block cursor-pointer" href="/">
      <Image
        className="lg:hidden"
        src={icon}
        alt="Icon"
        width={40}
        height={40}
        priority
        placeholder="blur"
      />
      <Image
        className="hidden lg:block"
        src={logoGreen}
        alt="Logo"
        width={180}
        height={40}
        priority
        placeholder="blur"
      />
    </Link>
  );
}
