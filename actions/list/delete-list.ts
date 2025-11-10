"use server";

import { prisma } from "@/lib/prisma";

export async function deleteList(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { error: "Invalid list ID" };
    }

    const list = await prisma.list.delete({
      where: {
        id,
      },
    });

    await prisma.auditLog.create({
      data: {
        cardId: list.id,
        entity: "LIST",
        action: "DELETE",
        cardName: list.name,
      },
    });
    return { success: "List deleted successfully" };
  } catch {
    return { error: "Something went wrong" };
  }
}
