"use server";

import type z from "zod";
import { updatetitleSchema } from "./schema";
import { prisma } from "@/lib/prisma";

export async function updateTitle(data: z.infer<typeof updatetitleSchema>) {
  try {
    const validatedField = updatetitleSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    console.log(data.boardId);
    console.log(data.newTitle);

    const card = await prisma.board.update({
      where: {
        id: data.boardId,
      },
      data: {
        name: data.newTitle,
      },
    });

    await prisma.auditLog.create({
      data: {
        cardId: card.id,
        entity: "CARD",
        action: "UPDATE",
        cardName: card.name,
      },
    });
    return { success: "Title updated" };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
