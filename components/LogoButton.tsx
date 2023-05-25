import Image from "next/image";

export function LogoButton() {
  return (
    <button>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/logo-green.png"
        alt="Logo"
        width={180}
        height={37}
        priority
      />
    </button>
  );
}
