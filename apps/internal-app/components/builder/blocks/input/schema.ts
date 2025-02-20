import { z } from "zod";

export const schema = z.object({
  placeholder: z.string().optional(),
  label: z.string(),
  action: z.function().args(z.unknown()).returns(z.void()).optional(),
}).strict();
