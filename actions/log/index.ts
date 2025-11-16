"use server";

import { prisma } from "@/lib/prisma";

export async function LogsBasedOnWorkspace(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return [];
    }

    const data = await prisma.auditLog.findMany({
      where: {
        workspaceId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch {
    return [];
  }
}
