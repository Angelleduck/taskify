"use server";
import { prisma } from "@/lib/prisma";
import type z from "zod";
import {
  boardPopuSchema,
  imageInfoSchema,
  imageInfoSchemaBoard,
} from "./schema";

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

    const board = await prisma.board.create({
      data: {
        workspaceId: imageInfo.workspaceId,
        name: data.title,
        image_url: imageInfo.image_url,
        thumb_url: imageInfo.thumb,
      },
    });

    return { success: "board has been created", boardId: board.id };
  } catch {
    return { error: "Something went wrong please retry." };
  }
}

export async function CreateBoardFromBoardId(
  data: z.infer<typeof boardPopuSchema>,
  imageInfo: z.infer<typeof imageInfoSchemaBoard>
) {
  try {
    const validatedField = boardPopuSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    const validatedInfo = imageInfoSchemaBoard.safeParse(imageInfo);
    if (!validatedInfo.success) {
      throw new Error(validatedInfo.error.errors[0].message);
    }

    const board = await prisma.board.findUnique({
      where: {
        id: imageInfo.boardId,
      },
    });
    if (!board) return { error: "Something went wrong please retry." };

    const newBoard = await prisma.board.create({
      data: {
        workspaceId: board.workspaceId,
        name: data.title,
        image_url: imageInfo.image_url,
        thumb_url: imageInfo.thumb,
      },
    });
    return { success: "board has been created", boardId: newBoard.id };
  } catch {
    return { error: "Something went wrong please retry." };
  }
}
