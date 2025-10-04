"use server";

import type z from "zod";
import { updateCardSchema } from "./schema";
import { prisma } from "@/lib/prisma";

export async function updateCard(data: z.infer<typeof updateCardSchema>) {
  try {
    const validatedField = updateCardSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    const transactions = data.map((card) =>
      prisma.card.update({
        where: { id: card.id },
        data: {
          listId: card.listId,
          order: card.order,
        },
      })
    );

    await prisma.$transaction(transactions);
  } catch {
    return { error: "error updating card" };
  }
}
