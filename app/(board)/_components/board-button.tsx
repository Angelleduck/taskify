"use client";

import { updateTitle } from "@/actions/board/update-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updatetitleSchema } from "@/actions/board/schema";
import { useRouter } from "next/navigation";

interface BoardButtonProps {
  boardTitle?: string;
  boardId?: string;
}

export function BoardButton({ boardTitle, boardId }: BoardButtonProps) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref) {
      ref.current?.focus();
      ref.current?.select();
    }
  }, [edit]);

  async function handleSubmit(e: React.FormEvent, boardId: string) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newTitle = formData.get("board") as string;

    const validatedField = updatetitleSchema.safeParse({ boardId, newTitle });
    if (newTitle === boardTitle) {
      setEdit(!edit);
      return;
    }
    if (!validatedField.success) {
      toast.error(validatedField.error.errors[0].message);
      return;
    }
    const res = await updateTitle({ boardId: boardId, newTitle });

    if (res?.error) {
      toast.error(res.error);
    } else {
      router.refresh();
      toast.success(res?.success);
      setEdit(!edit);
    }
  }

  return (
    <>
      {edit ? (
        <form onSubmit={(e) => handleSubmit(e, boardId!)}>
          <Input
            ref={ref}
            onBlur={() => setEdit(!edit)}
            id="name"
            defaultValue={boardTitle}
            name="board"
            placeholder="Board title:"
            className="text-white font-bold md:text-lg w-[250px] border-none focus-visible:none focus-visible:none"
          />
        </form>
      ) : (
        <Button
          onClick={() => setEdit(!edit)}
          className="text-lg text-white font-bold py-1 px-2 bg-transparent shadow-none hover:bg-white/20"
        >
          {boardTitle}
        </Button>
      )}
    </>
  );
}
