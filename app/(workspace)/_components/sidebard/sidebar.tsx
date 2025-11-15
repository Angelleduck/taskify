"use client";

import { Accordion } from "@/components/ui/accordion";
import { DialogCreateButton } from "../create-button";
import { AccordionList } from "../accordion-list";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";
import Sidebarskeleton from "./sidebar-skeleton";
import { useEffect, useState } from "react";

interface SidebarProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  workspaces: {
    id: string;
    name: string;
  }[];
}
export function Sidebar({ workspaces, className }: SidebarProps) {
  const path = usePathname();
  const [isMounted, setisMounted] = useState(false);
  const [value, setValue] = useLocalStorage<string[]>("sidebarKeys", []);

  useEffect(() => setisMounted(true), []);

  function handleKey(id: string) {
    //normally I would use includes and filter to check and remove the id
    //but this means two loops, with set it's more performant
    const set = new Set(value);
    set.has(id) ? set.delete(id) : set.add(id);
    const newArray = Array.from(set);

    setValue(newArray);
  }

  if (!isMounted) return <Sidebarskeleton />;

  return (
    <div className={cn("w-64", className)}>
      <div className="flex items-center justify-between ml-4 mb-2 text-xs font-medium">
        <h3>Workspaces</h3>
        <DialogCreateButton />
      </div>
      <div>
        <Accordion
          type="multiple"
          className="w-full space-y-2"
          defaultValue={value}
        >
          {workspaces.map((workspace) => (
            <AccordionList
              key={workspace.id}
              keyItem={workspace.id}
              workspaceId={workspace.id}
              title={workspace.name}
              path={path}
              handleKey={handleKey}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
