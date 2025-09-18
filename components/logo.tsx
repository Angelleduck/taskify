import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Link from "next/link";

type LogoProps = React.HTMLAttributes<HTMLAnchorElement>;

const customFont = localFont({
  src: "../public/fonts/font.woff2",
});

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 self-center", className)}
    >
      <img className="h-8 w-8" src="/logo.svg" alt="file" />
      <span className={`text-lg text-neutral-700 ${customFont.className}`}>
        Taskify
      </span>
    </Link>
  );
}
