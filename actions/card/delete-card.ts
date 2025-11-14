"use server";

import { prisma } from "@/lib/prisma";
let card;
export async function deleteCard(id: string) {
  try {
    if (typeof id !== "string") {
      return { error: "Invalid card ID" };
    }

    card = await prisma.card.delete({
      where: {
        id,
      },
      include: {
        list: {
          include: {
            board: {
              select: {
                workspaceId: true,
              },
            },
          },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: card.list.board.workspaceId,
        entityId: card.id,
        entity: "CARD",
        action: "CREATE",
        entityName: card.name,
      },
    });
    return { success: `Card "${card.name}" has been deleted` };
  } catch {
    return { error: "Something went wrong, please retry." };
  }
}
