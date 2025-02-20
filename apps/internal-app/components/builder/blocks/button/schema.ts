import { z } from "zod";

export const schema = z.object({
  label: z.string(),
  action: z.function().args().returns(z.void()),
  disabled: z.boolean(),
  variant: z.enum(["default", "destructive", "outline", "ghost", "link", "secondary"]),
}).strict();
