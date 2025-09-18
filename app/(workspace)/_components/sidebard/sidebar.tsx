"use client";

import { Accordion } from "@/components/ui/accordion";
import { DialogCreateButton } from "../create-button";
import { AccordionList } from "../accordion-list";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  workspaces: {
    id: string;
    name: string;
  }[];
}
export function Sidebar({ workspaces, className }: SidebarProps) {
  const { onUpdate } = useStore();
  useEffect(() => {
    //take the workspace and share it to responsive sidebar
    onUpdate(workspaces);
  }, []);

  const path = usePathname();
  const [state, setState] = useState<string[]>([]);

  //The first useeffect it to create the key or get the value
  //to store it in the state
  useEffect(() => {
    const storedValue = localStorage.getItem("sidebarKey");
    const getIds = storedValue ? JSON.parse(storedValue) : [];
    setState(getIds);
  }, []);

  //the second on is to update the local storage
  useEffect(() => {
    localStorage.setItem("sidebarKey", JSON.stringify(state));
  }, [state]);

  function handleKey(id: string) {
    //normally I would use includes and filter to check and remove the id
    //but this means two loops, with set it's more performant
    const set = new Set(state);
    set.has(id) ? set.delete(id) : set.add(id);
    const newArray = Array.from(set);

    setState(newArray);
  }

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
          value={state}
          onValueChange={setState}
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
