"use client";

import { createWorkspace } from "@/actions/workspace/create-workspace";
import { Input } from "@/components/auth/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createWorkspaceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";

type InputField = z.infer<typeof createWorkspaceSchema>;

export function DialogCreateButton() {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);

  const onsubmit: SubmitHandler<InputField> = async (data) => {
    const res = await createWorkspace(data);

    if (res?.error) {
      setError("root", {
        message: res.error,
      });
      return;
    }
    router.refresh();
    ref.current?.click();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<InputField>({
    resolver: zodResolver(createWorkspaceSchema),
  });
  return (
    <Dialog onOpenChange={() => reset()}>
      <DialogTrigger asChild>
        <Button className="p-2" variant="ghost" ref={ref}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new Workspace</DialogTitle>
          <DialogDescription>
            Give a nice name to your new workspace
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onsubmit)}>
          <Input register={register} type="text" id="title" />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
        </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
