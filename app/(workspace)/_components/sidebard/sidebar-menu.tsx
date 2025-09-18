import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { workspaces } from "@/actions/workspaces/get-workspaces";
import { Workspaces } from "@/actions/workspaces/types";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";
import Logo from "@/components/logo";

export function SidebarMenu() {
  const [stateWorkspaces, setStateWorkspaces] = useState<Workspaces[]>([]);
  useEffect(() => {
    async function fetchWokspaces() {
      const data = await workspaces();
      setStateWorkspaces(data);
    }
    fetchWokspaces();
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent className="px-2 overflow-y-auto" side="left">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <div>
            <Sidebar className="w-full" workspaces={stateWorkspaces} />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
