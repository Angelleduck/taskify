"use client";

import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Plus, X } from "lucide-react";
import { type KeyboardEvent, memo, useEffect, useRef } from "react";
import { Input } from "@/components/auth/input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { createCardSchema } from "@/actions/card/schema";
import { createCard } from "@/actions/card/create-card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AddCardProps {
  listId: string;
  handleEdit: () => void;
  handleDisableEdit: () => void;
  isEditing: boolean;
}

type InputField = z.infer<typeof createCardSchema>;

export const AddCard = memo(function AddCard({
  listId,
  handleEdit,
  handleDisableEdit,
  isEditing,
}: AddCardProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputField>({
    resolver: zodResolver(createCardSchema),
  });

  const { ref, ...rest } = register("name");

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const disableEditing = () => {
    handleDisableEdit();
    reset();
  };

  useClickOutside(formRef, disableEditing);

  const onsubmit: SubmitHandler<InputField> = async (data) => {
    const res = await createCard(data);

    if (res.error) {
      toast(res.error);
    } else {
      toast.success(res.success);
    }
    reset();
    router.refresh();
  };

  const submitOnkeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onsubmit)}
          ref={formRef}
          className="w-full pb-3 rounded-md"
        >
          <textarea
            id="name"
            onKeyDown={submitOnkeyDown}
            {...rest}
            name="name"
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            placeholder="Enter a title for this card..."
            className="resize-none w-full border rounded-md outline-none text-sm p-2 h-20 mb-2"
          />

          <Input
            register={register}
            className="text-sm hidden"
            type="text"
            id="listId"
            defaultValue={listId}
          />

          {errors.name && (
            <p className="text-sm text-rose-500">{errors.name.message}</p>
          )}
          <div className="flex items-center gap-1">
            <Button type="submit" className="px-3">
              {isSubmitting ? "Adding" : "Add card"}
            </Button>

            <Button onClick={disableEditing} className="px-3" variant="ghost">
              <X size={20} />
            </Button>
          </div>
        </form>
      ) : (
        <Button
          onClick={handleEdit}
          className="text-black bg-transparent hover:bg-transparent shadow-none w-full justify-start h-11 p-2"
        >
          <Plus size={18} />
          Add a card
        </Button>
      )}
    </>
  );
});
