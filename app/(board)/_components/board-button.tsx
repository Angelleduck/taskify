"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

export function BoardButton() {
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref) {
      ref.current?.focus();
    }
  }, [edit]);

  return (
    <>
      {edit ? (
        <form>
          <Input
            ref={ref}
            onBlur={() => setEdit(!edit)}
            id="name"
            name="board"
            placeholder="Board title:"
            className="text-white font-bold md:text-lg w-[250px]"
          />
        </form>
      ) : (
        <Button
          onClick={() => setEdit(!edit)}
          className="text-lg text-white font-bold py-1 px-2 bg-transparent hover:bg-white/20"
        >
          Board 1
        </Button>
      )}
    </>
  );
}
