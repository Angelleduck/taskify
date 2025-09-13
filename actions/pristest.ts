"use server";

import { prisma } from "@/lib/prisma";

export async function pristest() {
  const boards = await prisma.boardId.findMany();
  return boards;
}
