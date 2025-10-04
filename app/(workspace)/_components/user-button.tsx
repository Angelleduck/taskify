"use client";

import { getUser } from "@/actions/getUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleUserRound, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

export function UserButton() {
  const [user, setUser] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data?.user.email);
    }
    fetchUser();
  });

  async function clientAction() {
    await logout();
    router.refresh();
  }

  return (
    <Popover>
      <PopoverTrigger>
        <CircleUserRound size={30} className=" stroke-red-400" />
      </PopoverTrigger>
      <PopoverContent
        className="px-0"
        sideOffset={10}
        collisionPadding={{ right: 20 }}
      >
        <p className="text-sm font-medium pl-8">{user}</p>
        <button
          type="button"
          onClick={clientAction}
          className="w-full text-neutral-600 hover:bg-neutral-100 flex gap-4 items-center py-2 px-8"
        >
          <LogOut size={14} />
          <span>sign out</span>
        </button>
      </PopoverContent>
    </Popover>
  );
}
