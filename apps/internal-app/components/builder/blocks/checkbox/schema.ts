import { z } from "zod";

export const schema = z.object({
  label: z.string(),
  default: z.boolean().optional(),
  action: z.function().args(z.boolean()).returns(z.void()).optional(),
}).strict();
