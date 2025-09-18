"use server";
import { prisma } from "@/lib/prisma";
import type z from "zod";
import { boardPopuSchema, imageInfoSchema } from "./schema";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export async function CreateBoard(
  data: z.infer<typeof boardPopuSchema>,
  imageInfo: z.infer<typeof imageInfoSchema>
) {
  try {
    const validatedField = boardPopuSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    const validatedInfo = imageInfoSchema.safeParse(imageInfo);
    if (!validatedInfo.success) {
      throw new Error(validatedInfo.error.errors[0].message);
    }

    await prisma.board.create({
      data: {
        workspaceId: imageInfo.workspaceId,
        name: data.title,
        image_url: imageInfo.image_url,
        thumb_url: imageInfo.thumb,
      },
    });

    return { success: "board has been created" };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientValidationError
    ) {
      return { error: "Something went wrong please retry." };
    } else if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
