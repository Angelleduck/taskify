"use client";

import { deleteBoard } from "@/actions/board/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

interface EllipsisDeleteProps {
  boardId: string;
}

export function EllipsisDelete({ boardId }: EllipsisDeleteProps) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  async function handleDelete(boardId: string) {
    const res = await deleteBoard(boardId);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
      closeRef.current?.click();
      router.replace("/workspace");
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="text-lg text-white font-bold w-8 h-8 bg-transparent hover:bg-white/20 shadow-none"
        >
          <Ellipsis className="text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 py-3 px-0">
        <div>
          <p className="text-sm font-medium text-center text-neutral-600">
            Board actions
          </p>

          <PopoverClose asChild>
            <Button
              ref={closeRef}
              variant="ghost"
              className="w-8 h-8 absolute right-2 top-2 text-neutral-600"
            >
              <X size={16} />
            </Button>
          </PopoverClose>
        </div>
        <div>
          <Button
            onClick={() => handleDelete(boardId)}
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this board
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
