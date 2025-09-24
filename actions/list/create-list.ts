"use server";

import { prisma } from "@/lib/prisma";
import z from "zod";
import { createListSchema } from "./schema";

export async function createList(data: z.infer<typeof createListSchema>) {
  try {
    const validatedField = createListSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    await prisma.list.create({
      data: {
        name: data.name,
        boardId: data.boardId,
      },
    });

    return { success: "list has been created" };
  } catch {
    return { error: "Something went wrong please retry." };
  }
}
