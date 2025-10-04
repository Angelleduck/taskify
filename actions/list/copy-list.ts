"use server";

import { prisma } from "@/lib/prisma";
import { createList } from "./create-list";

export async function copyList(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { error: "Invalid list ID" };
    }

    const originalList = await prisma.list.findUnique({
      where: {
        id,
      },
      include: {
        cards: true,
      },
    });

    if (!originalList) {
      return { error: "List not found" };
    }

    const newList = await createList({
      name: `${originalList.name} - Copy`,
      boardId: originalList.boardId,
    });

    if (!newList.data) {
      return { error: "Error creating list" };
    }

    const transactions = originalList.cards.map((card) =>
      prisma.card.create({
        data: {
          name: card.name,
          order: card.order,
          listId: newList.data.id,
        },
      })
    );
    await prisma.$transaction(transactions);
    return { success: "List copied successfully" };
  } catch {
    return { error: "Something went wrong" };
  }
}
