"use server";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

//using react cache function to cache user data but
//later I will use tanstack query

const workspaces = cache(async () => {
  const data = await prisma.workspace.findMany();
  return data;
});

export { workspaces };
