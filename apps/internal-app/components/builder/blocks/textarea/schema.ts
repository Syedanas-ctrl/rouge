import { z } from "zod";

export const schema = z.object({
    label: z.string(),
    size: z.enum(["sm", "md", "lg"]),
  }).strict()