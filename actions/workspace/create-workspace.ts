"use server";

import { prisma } from "@/lib/prisma";
import { createWorkspaceSchema } from "@/schemas";
import type z from "zod";

export async function createWorkspace(
  data: z.infer<typeof createWorkspaceSchema>
) {
  try {
    const validatedField = createWorkspaceSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    await prisma.workspace.create({
      data: {
        name: data.title,
      },
    });

    return { success: "Workspace has been created" };
  } catch {
    return { error: "Something went wrong please retry." };
  }
}
