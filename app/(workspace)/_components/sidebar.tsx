"use client";

import { Accordion } from "@/components/ui/accordion";
import { DialogCreateButton } from "./create-button";
import { AccordionList } from "./accordion-list";
import { usePathname } from "next/navigation";

interface SidebarProps {
  workspaces: {
    id: string;
    name: string;
  }[];
}
export function Sidebar({ workspaces }: SidebarProps) {
  const path = usePathname();
  return (
    <div className="w-64">
      <div className="flex items-center justify-between ml-4 mb-2 text-xs font-medium">
        <h3>Workspaces</h3>

        <DialogCreateButton />
      </div>
      <div>
        <Accordion
          type="multiple"
          className="w-full space-y-2"
          defaultValue={[
            "cmfh9inhh0000uer8roi5zqre",
            "cmfh9itws0001uer8klisz61w",
          ]}
        >
          {workspaces.map((workspace) => (
            <AccordionList
              key={workspace.id}
              keyItem={workspace.id}
              workspaceId={workspace.id}
              title={workspace.name}
              path={path}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
