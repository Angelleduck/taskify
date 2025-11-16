"use server";

import { decreaseCountBoard } from "@/lib/limit";
import { prisma } from "@/lib/prisma";
import { checkSubscription } from "@/lib/subscription";

export async function deleteBoard(id: string) {
  try {
    const isPro = await checkSubscription();
    if (!id || typeof id !== "string") {
      return { error: "Invalid list ID" };
    }

    await prisma.board.delete({
      where: {
        id,
      },
    });

    if (!isPro) await decreaseCountBoard();

    return { success: "Board deleted successfully" };
  } catch {
    return { error: "Something went wrong" };
  }
}
