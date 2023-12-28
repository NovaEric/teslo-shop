import { titleFont } from "@/config/font";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold `}>
          Teslo{" "}
        </span>
        <span>shop </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      
      <span className="ms-2">|</span>
      <Link href="/" className="ms-2">
        Privacy
      </Link>

      <span className="ms-2">|</span>
      <Link href="/" className="ms-2">
        Location
      </Link>
    </div>
  );
};
