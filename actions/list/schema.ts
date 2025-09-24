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

export { createListSchema };
