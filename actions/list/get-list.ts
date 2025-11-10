import { prisma } from "@/lib/prisma";

export async function getLists(boardId?: string) {
  if (!boardId) {
    return [];
  }

  const Lists = await prisma.list.findMany({
    where: {
      boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return Lists;
}
