import z from "zod";

const createListSchema = z.object({
  name: z
    .string()
    .min(4, "list's name is too short")
    .max(20, "list's name is too long"),

  boardId: z
    .string()
    .min(10, "provide valid Id")
    .max(30, "max provide valid Id"),
});

const updateListSchema = z.array(
  z.object({
    id: z.string().max(40, "list's name is too long"),
    name: z
      .string()
      .min(4, "list's name is too short")
      .max(20, "list's name is too long"),

    boardId: z
      .string()
      .min(10, "provide valid Id")
      .max(30, "max provide valid Id"),
    order: z.number(),
    cards: z.array(
      z.object({
        name: z.string(),
        id: z.string(),
        order: z.number(),
        listId: z.string(),
      })
    ),
  })
);

export { createListSchema, updateListSchema };
