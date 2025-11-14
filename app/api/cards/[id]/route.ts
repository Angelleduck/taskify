import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "Invalid card ID" }, { status: 400 });
  }

  try {
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
