"use server";
import { prisma } from "@/lib/prisma";

export async function boards(workspaceId?: string) {
  if (!workspaceId) {
    return [];
  }

  const data = await prisma.board.findMany({
    where: {
      workspaceId,
    },
  });

  return data;
}

export async function board(id?: string) {
  if (!id) {
    return [];
  }

  const data = await prisma.board.findMany({
    where: {
      id,
    },
  });

  return data;
}
