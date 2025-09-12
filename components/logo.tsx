import localFont from "next/font/local";
import Link from "next/link";

const customFont = localFont({
  src: "../public/fonts/font.woff2",
});

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 self-center">
      <img className="h-8 w-8" src="/logo.svg" alt="file" />
      <span className={`text-lg text-neutral-700 ${customFont.className}`}>
        Taskify
      </span>
    </Link>
  );
}
