"use client";

import { Button } from "@/components/ui/button";
import { useOnClickOutside } from "usehooks-ts";
import { AlignLeft } from "lucide-react";
import { type FormEvent, type RefObject, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { updateDescription } from "@/actions/card/common";

interface DescriptionProps {
  text?: string;
  cardId: string;
  mutate: () => void;
}

export function Description({ text, cardId, mutate }: DescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const editRef = useRef<HTMLFormElement>(null);

  const handleEdit = () => {
    if (isEditing) setIsEditing(false);
  };
  useOnClickOutside(editRef as RefObject<HTMLElement>, handleEdit);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(e.currentTarget);
    const newText = formdata.get("description") as string;
    await updateDescription({ cardId, newText });
    mutate();
    setIsLoading(false);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex gap-2">
        <AlignLeft className="h-5 w-5 mt-1 text-neutral-700" />
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold text-neutral-700">Description</p>
          {isEditing ? (
            <form onSubmit={handleSubmit} ref={editRef}>
              <textarea
                id="description"
                name="description"
                defaultValue={text || ""}
                autoFocus
                disabled={isLoading}
                placeholder="Add a more detailed description..."
                className="resize-none w-full border rounded-md outline-none text-sm p-2 min-h-[78px] mb-1"
              />
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button onClick={handleEdit} variant="ghost" type="button">
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div
              onClick={() => {
                setIsEditing(true);
              }}
              role="button"
              className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
            >
              {text ? text : "Add a more detailed description..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div>
      <div className="flex gap-2">
        <AlignLeft className="h-5 w-5 mt-1 text-neutral-700" />
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold text-neutral-700">Description</p>
          <Skeleton className="min-h-[78px] py-3 px-3.5" />
        </div>
      </div>
    </div>
  );
};
