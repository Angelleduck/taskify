"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserButton } from "./user-button";
import { SidebarMenu } from "./sidebard/sidebar-menu";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BoardPopup } from "./board/board-popup";

type NavbarProps = React.HTMLAttributes<HTMLElement>;

export default function Navbar({ className }: NavbarProps) {
  const { id } = useParams<{ id: string }>();
  return (
    <header
      className={cn(
        "flex items-center justify-between py-[10px] px-3 bg-white shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Logo className="hidden md:flex" />
        <SidebarMenu />

        <Popover>
          <PopoverTrigger asChild>
            <Button className="px-2 gap-1">
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-4">
            <BoardPopup workspaceId={id} />
          </PopoverContent>
        </Popover>
      </div>
      <UserButton />
    </header>
  );
}
