"use server";

import { prisma } from "@/lib/prisma";

export async function deleteList(id: string) {
  try {
    await prisma.list.delete({
      where: {
        id,
      },
    });
    return { success: "List deleted successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
