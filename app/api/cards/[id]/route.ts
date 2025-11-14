import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return Response.json({ error: "Invalid card ID" }, { status: 400 });
  }

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
