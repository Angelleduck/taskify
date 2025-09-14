import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AccordionLinkProps {
  title: string;
  href: string;
  Icon: LucideIcon;
  active: boolean;
}
export function AccordionLink({
  href,
  Icon,
  title,
  active,
}: AccordionLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 ${
        active && "bg-neutral-200"
      } hover:bg-neutral-200 rounded-md p-2 pl-10`}
    >
      <Icon size={16} />
      {title}
    </Link>
  );
}
