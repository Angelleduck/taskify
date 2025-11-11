import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, ctx: { params: { id: string } }) {
  const { id } = await ctx.params;
  try {
    if (!id || typeof id !== "string") {
      return { error: "Invalid card ID" };
    }

    const data = await prisma.card.findUnique({
      where: {
        id,
      },
      include: {
        list: {
          select: {
            name: true,
          },
        },
      },
    });

    return Response.json(data);
  } catch {}
}
