import { z } from "zod";

export const schema = z.object({
    size: z.enum(["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl", "10xl"]),
  }).strict()
