import {
    Avatar as AvatarComponent,
    AvatarFallback,
  } from "@workspace/ui/components/avatar"
  import { schema } from "./schema"
  import { z } from "zod"
  
  export function Avatar({ label }: z.infer<typeof schema>) {
    return (
      <AvatarComponent>
        <AvatarFallback>{label}</AvatarFallback>
      </AvatarComponent>
    )
  }
  