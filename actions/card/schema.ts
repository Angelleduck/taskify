import z from "zod";

const createCardSchema = z.object({
  name: z
    .string({ message: "name issuue" })
    .min(4, "list's name is too short")
    .max(30, "list's name is too long"),

  listId: z
    .string()
    .min(10, "provide valid Id")
    .max(30, "max provide valid Id"),
});

export { createCardSchema };
