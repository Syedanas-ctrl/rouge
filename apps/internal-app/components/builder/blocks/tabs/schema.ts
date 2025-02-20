import { z } from "zod";

export const schema = z.object({
    options: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })),
});

