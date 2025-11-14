"use client";

import { CreateBoard } from "@/actions/board/create-board";
import { boardPopuSchema } from "@/actions/board/schema";
import { getImages } from "@/actions/get-images";
import { Input } from "@/components/auth/input";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@/components/ui/popover";

import { LoaderCircle, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import BoardSkeleton from "./board-skeleton";
import { defaultImages } from "@/constants/images";
import { ImageBox } from "./image-box";
import { useProdModal } from "@/hooks/useProModal";

interface BoardProps {
  workspaceId?: string;
}

type InputField = z.infer<typeof boardPopuSchema>;

export function BoardPopup({ workspaceId }: BoardProps) {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Record<string, any>>();
  const router = useRouter();
  const { onOpen } = useProdModal();

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function fetchImg() {
      try {
        const res = (await getImages()) as Array<Record<string, any>>;
        if (res) {
          setImages(res);
        } else {
          throw new Error("failed to get images");
        }
      } catch {
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    }
    fetchImg();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InputField>({
    resolver: zodResolver(boardPopuSchema),
  });

  const onsubmit: SubmitHandler<InputField> = async (title) => {
    //Here no need to check for workspaceId, I'm doing it for
    //typescript in imageInfo
    if (!selectedImage || !workspaceId) {
      setError("root", {
        message: "Select an image",
      });
      return;
    }

    const imageInfo = {
      image_url: selectedImage.urls.regular as string,
      thumb: selectedImage.urls.regular as string,
      workspaceId,
    };
    const res = await CreateBoard(title, imageInfo);

    if (res?.error) {
      setError("root", {
        message: res.error,
      });
      onOpen();
      return;
    }
    router.push(`/board/${res.boardId}`);
  };

  function handleSelectImage(image: Record<string, any>) {
    setSelectedImage(image);
  }

  return (
    <div className="flex flex-col relative">
      <PopoverClose asChild>
        <Button
          ref={ref}
          className="absolute top-[-6px] right-0 w-8 h-8"
          variant="ghost"
        >
          <X />
        </Button>
      </PopoverClose>
      <p className="text-center text-neutral-600 text-sm font-medium mb-4">
        Create board
      </p>

      <div className="grid grid-cols-3 grid-rows-[repeat(3,51px)] gap-2 mb-4">
        {loading ? (
          <BoardSkeleton />
        ) : (
          images.map((image) => (
            <ImageBox
              key={image.id}
              selectedImage={selectedImage}
              handleSelectedImage={handleSelectImage}
              image={image}
            />
          ))
        )}
      </div>

      <form onSubmit={handleSubmit(onsubmit)}>
        <label
          className="text-xs font-semibold text-neutral-700"
          htmlFor="title"
        >
          Board title
        </label>
        <Input register={register} id="title" type="text" />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}
        {errors.root && (
          <p className="text-red-500 text-xs">{errors.root.message}</p>
        )}

        <Button type="submit" className="w-full mt-3">
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Create"}
        </Button>
      </form>
    </div>
  );
}
