"use server";

import { prisma } from "@/lib/prisma";

interface UpdateTitleProps {
  newTitle: string;
  cardId: string;
}
interface UpdateDescriptionProps {
  newText: string;
  cardId: string;
}

export async function updateTitle({ newTitle, cardId }: UpdateTitleProps) {
  if (typeof newTitle !== "string" || typeof cardId !== "string") {
    return;
  }

  try {
    const card = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        name: newTitle,
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
        action: "UPDATE",
        entityName: card.name,
      },
    });
  } catch {
    return { error: "something went wrong" };
  }
}

export async function updateDescription({
  newText,
  cardId,
}: UpdateDescriptionProps) {
  if (typeof cardId !== "string" || typeof newText !== "string") {
    return;
  }

  try {
    const card = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        description: newText,
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
        action: "UPDATE",
        entityName: card.name,
      },
    });
  } catch {
    return { error: "something went wrong" };
  }
}
