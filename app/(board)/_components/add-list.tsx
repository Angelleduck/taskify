"use client";

import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createList } from "@/actions/list/create-list";
import { createListSchema } from "@/actions/list/schema";
import { Input } from "@/components/auth/input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useRouter } from "next/navigation";

interface AddListProps {
  boardId: string;
}

type InputField = z.infer<typeof createListSchema>;

export function AddList({ boardId }: AddListProps) {
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputField>({
    resolver: zodResolver(createListSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { ref, ...rest } = register("name");

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [edit]);

  const disableEditing = () => {
    setEdit(false);
    reset();
  };

  useClickOutside(formRef, disableEditing);

  const onsubmit: SubmitHandler<InputField> = async (data) => {
    await createList(data);
    disableEditing();
    router.refresh();
  };

  return (
    <>
      {edit ? (
        <form
          onSubmit={handleSubmit(onsubmit)}
          ref={formRef}
          className="w-[272px] p-3 bg-white rounded-md shrink-0"
        >
          <input
            id="name"
            {...rest}
            name="name"
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            type="text"
            placeholder="Enter list title..."
            className="mb-4 text-sm w-full py-2 outline-none px-4 disabled:cursor-not-allowed rounded-md border focus:border-black"
            disabled={isSubmitting}
          />

          <Input
            register={register}
            className="mb-4 text-sm hidden"
            type="text"
            id="boardId"
            defaultValue={boardId}
          />

          {errors.name && (
            <p className="text-sm text-rose-500">{errors.name.message}</p>
          )}
          <div className="flex items-center gap-1">
            <Button type="submit" className="px-3">
              {isSubmitting ? "Adding" : "Add list"}
            </Button>

            <Button className="px-3" variant="ghost">
              <X size={20} />
            </Button>
          </div>
        </form>
      ) : (
        <Button
          onClick={() => setEdit(!edit)}
          className="text-black bg-white/80 hover:bg-white/50 w-[272px] justify-start h-11 shrink-0"
        >
          <Plus size={18} />
          Add a list
        </Button>
      )}
    </>
  );
}
