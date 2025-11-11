import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, ctx: { params: { id: string } }) {
  const { id } = await ctx.params;
  try {
    if (!id || typeof id !== "string") {
      return { error: "Invalid card ID" };
    }

    const data = await prisma.auditLog.findMany({
      where: {
        entityId: id,
      },
    });

    return Response.json(data);
  } catch {}
}
