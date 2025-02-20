import { z } from "zod";

export const schema = z.object({
  min: z.number(),
  max: z.number(),
  default: z.number().optional(),
  step: z.number().optional(),
  action: z.function().args(z.unknown()).returns(z.void()).optional(),
}).strict();
    