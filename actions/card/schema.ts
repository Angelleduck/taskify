import z from "zod";

const createCardSchema = z.object({
  name: z
    .string({ message: "name issuue" })
    .min(4, "card's name is too short")
    .max(30, "card's name is too long"),

  listId: z
    .string()
    .min(10, "provide valid Id")
    .max(30, "max provide valid Id"),
  description: z.string().optional(),
});

const updateCardSchema = z.array(
  z.object({
    id: z.string().min(10, "provide valid Id").max(30, "max provide valid Id"),
    listId: z
      .string()
      .min(10, "provide valid Id")
      .max(30, "max provide valid Id"),
    order: z.number().min(0, "provide valid order"),
  })
);

export { createCardSchema, updateCardSchema };
