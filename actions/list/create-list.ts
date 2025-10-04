"use server";

import { prisma } from "@/lib/prisma";
import type z from "zod";
import { createListSchema } from "./schema";

export async function createList(data: z.infer<typeof createListSchema>) {
  try {
    const validatedField = createListSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }
    let order: number;

    const lastList = await prisma.list.findFirst({
      where: {
        boardId: data.boardId,
      },
      orderBy: {
        order: "desc",
      },
    });

    if (lastList == null) {
      order = 1;
    } else {
      order = lastList.order + 1;
    }

    const list = await prisma.list.create({
      data: {
        name: data.name,
        boardId: data.boardId,
        order: order,
      },
    });

    return { data: list, success: "List created successfully" };
  } catch {
    return { error: "Something went wrong please retry." };
  }
}
