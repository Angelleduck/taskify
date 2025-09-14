"use server";

import { prisma } from "@/lib/prisma";

export async function pristest() {
  const workspaces = await prisma.workspace.findMany();
  return workspaces;
}
