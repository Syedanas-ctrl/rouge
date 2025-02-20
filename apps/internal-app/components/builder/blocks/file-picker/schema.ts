import { z } from "zod";

export const schema = z.object({
  label: z.string(),
  maxSize: z.number(),
  accept: z.array(z.enum(["image/*", "video/*", "audio/*", "application/*"])),
  action: z.function().args(z.instanceof(File)).returns(z.void()).optional(),
}).strict();
