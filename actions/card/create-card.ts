"use server";

import { prisma } from "@/lib/prisma";
import type z from "zod";
import { createCardSchema } from "./schema";

export async function createCard(data: z.infer<typeof createCardSchema>) {
  try {
    const validatedField = createCardSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    let order: number;

    const lastCard = await prisma.card.findFirst({
      where: {
        listId: data.listId,
      },
      orderBy: {
        order: "desc",
      },
    });

    if (lastCard == null) {
      order = 1;
    } else {
      order = lastCard.order + 1;
    }

    await prisma.card.create({
      data: {
        name: data.name,
        listId: data.listId,
        order: order,
      },
    });

    return { success: "Card has been created" };
  } catch {
    return { error: "Something went wrong, please retry." };
  }
}
