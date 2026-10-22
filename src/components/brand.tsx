import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return <Link href="/" aria-label="FUTERA home" className="inline-flex min-h-11 shrink-0 items-center rounded-sm"><Image src="/futera-wordmark.svg" width={152} height={32} className="w-24 sm:w-[152px]" alt="FUTERA" priority /></Link>;
}
