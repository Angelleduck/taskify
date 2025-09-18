import z from "zod";

const boardPopuSchema = z.object({
  title: z
    .string()
    .min(4, "Board's name must be at least 4 characters")
    .max(15, "Board's name must be at most 15 characters"),
});

const imageInfoSchema = z.object({
  image_url: z.string().min(8, "provide a vaild image"),
  thumb: z.string().min(8, "provide a vaild image"),
  workspaceId: z.string().min(4, "provide a valid id"),
});

export { boardPopuSchema, imageInfoSchema };
