import { z } from "zod";

export const schema = z.object({
  label: z.string(),
  default: z.date().optional(),
  action: z.function().args(z.date()).returns(z.void()).optional(),
}).strict();
