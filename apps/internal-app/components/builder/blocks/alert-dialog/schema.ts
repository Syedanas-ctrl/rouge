import { z } from "zod";

export const schema = z.object({
  label: z.string(),
  action: z.function().args().returns(z.void()),
}).strict();
