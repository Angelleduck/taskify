"use server";

import type z from "zod";
import { updateListSchema } from "./schema";
import { prisma } from "@/lib/prisma";

export async function updateList(data: z.infer<typeof updateListSchema>) {
  try {
    const validatedField = updateListSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    const transactions = data.map((list) =>
      prisma.list.update({
        where: { id: list.id },
        data: {
          order: list.order,
        },
      })
    );

    await prisma.$transaction(transactions);
  } catch {}
}
