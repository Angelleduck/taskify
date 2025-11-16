"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, CreditCard, Layout } from "lucide-react";
import { AccordionLink } from "./accordion-link";
interface AccorProps {
  keyItem: string;
  workspaceId: string;
  title: string;
  path?: string;
  handleKey: (id: string) => void;
}

export function AccordionList({
  keyItem,
  workspaceId,
  title,
  path,
  handleKey,
}: AccorProps) {
  const items = [
    {
      Icon: Layout,
      name: "Board",
      href: `/workspace/${workspaceId}`,
    },
    {
      Icon: Activity,
      name: "Activity",
      href: `/workspace/${workspaceId}/activity`,
    },
    {
      Icon: CreditCard,
      name: "Billing",
      href: `/workspace/${workspaceId}/billing`,
    },
  ];

  return (
    <AccordionItem key={keyItem} value={workspaceId}>
      <AccordionTrigger
        onClick={() => handleKey(workspaceId)}
        className={`${
          path?.includes(workspaceId) && "bg-sky-500/10 text-sky-700"
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
            active={path === item.href}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
