"use server";

import { decreaseCountBoard } from "@/lib/limit";
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

    await decreaseCountBoard();

    return { success: "Board deleted successfully" };
  } catch {
    return { error: "Something went wrong" };
  }
}
