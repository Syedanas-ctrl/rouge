import { z } from "zod";

export const schema = z.object({
    label: z.string(),
    default: z.string().optional(),
    options: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
}).strict();
