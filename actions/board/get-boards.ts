"use server";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

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

export const board = cache(async (id?: string) => {
  if (!id) {
    return null;
  }

  const data = await prisma.board.findUnique({
    where: {
      id,
    },
  });

  return data;
});
