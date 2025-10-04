"use server";

import { prisma } from "@/lib/prisma";

export async function deleteList(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { error: "Invalid list ID" };
    }

    await prisma.list.delete({
      where: {
        id,
      },
    });
    return { success: "List deleted successfully" };
  } catch {
    return { error: "Something went wrong" };
  }
}
