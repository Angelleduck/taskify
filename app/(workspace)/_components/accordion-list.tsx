"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { AccordionLink } from "./accordion-link";

interface AccorProps {
  keyItem: string;
  boardId: string;
  title: string;
  path?: string;
}

export function AccordionList({ keyItem, boardId, title, path }: AccorProps) {
  const items = [
    {
      Icon: Layout,
      name: "Board",
      href: `/workspace/${boardId}`,
    },
    {
      Icon: Activity,
      name: "Activity",
      href: `/workspace/${boardId}/activity`,
    },
    {
      Icon: Settings,
      name: "Settings",
      href: `/workspace/${boardId}/settings`,
    },
    {
      Icon: CreditCard,
      name: "Billing",
      href: `/workspace/${boardId}/billing`,
    },
  ];
  return (
    <AccordionItem key={keyItem} value={boardId}>
      <AccordionTrigger
        className={`${
          path?.includes(boardId) && "bg-sky-500/10 text-sky-700"
        } rounded-md p-[10px]`}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2 text-balance pt-2 text-neutral-700">
        {items.map((item) => (
          <AccordionLink
            key={item.name}
            Icon={item.Icon}
            href={item.href}
            title={item.name}
            active={`/workspace/${path}` === item.href}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
