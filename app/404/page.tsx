import Image from "next/image";
import Link from "next/link";
import icon from "../../public/icon.png";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src={icon}
        alt="Logo"
        width={40}
        height={40}
        priority
        placeholder="blur"
      />
      <h2 className="mt-5 font-bold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="mt-5 underline">
        Return to Home
      </Link>
    </div>
  );
}
