"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserButton } from "./user-button";
import { SidebarMenu } from "./sidebard/sidebar-menu";
import { cn } from "@/lib/utils";

type NavbarProps = React.HTMLAttributes<HTMLElement>;

export default function Navbar({ className }: NavbarProps) {
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
        <Button>
          <Plus />
          Create
        </Button>
      </div>
      <UserButton />
    </header>
  );
}
