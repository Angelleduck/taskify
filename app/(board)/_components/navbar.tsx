"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarMenu } from "@/app/(workspace)/_components/sidebard/sidebar-menu";
import { UserButton } from "@/app/(workspace)/_components/user-button";
import { BoardPopup } from "./board-popup";

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
            <BoardPopup boardId={id} />
          </PopoverContent>
        </Popover>
      </div>
      <UserButton />
    </header>
  );
}
