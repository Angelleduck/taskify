"use server";

import { prisma } from "@/lib/prisma";
import z from "zod";
import { createCardSchema } from "./schema";

export async function createCard(data: z.infer<typeof createCardSchema>) {
  try {
    const validatedField = createCardSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    await prisma.card.create({
      data: {
        name: data.name,
        listId: data.listId,
      },
    });

    return { success: "list has been created" };
  } catch {
    return { error: "Something went wrong please retry." };
  }
}
