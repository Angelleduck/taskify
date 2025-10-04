"use server";

import { prisma } from "@/lib/prisma";

export async function deleteBoard(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { error: "Invalid list ID" };
    }

    await prisma.board.delete({
      where: {
        id,
      },
    });

    return { success: "Board deleted successfully" };
  } catch {
    return { error: "Something went wrong" };
  }
}
