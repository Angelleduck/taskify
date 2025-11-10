"use server";

import { prisma } from "@/lib/prisma";
import { createCard } from "./create-card";
export async function copyCard(id: string) {
  try {
    if (typeof id !== "string") {
      return { error: "Invalid card ID" };
    }

    const originalCard = await prisma.card.findUnique({
      where: {
        id,
      },
    });

    if (!originalCard) {
      return { error: "card not found" };
    }

    await createCard({
      name: `${originalCard.name} - Copy`,
      listId: originalCard.listId,
      description: originalCard.description || "",
    });

    return { success: `card ${originalCard.name} copied` };
  } catch {
    return { error: "Something went wrong, please retry." };
  }
}
