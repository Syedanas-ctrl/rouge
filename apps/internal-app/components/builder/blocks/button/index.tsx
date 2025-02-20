import { Button as ButtonComponent } from "@workspace/ui/components/button"
import { schema } from "./schema"
import { z } from "zod"

export function Button({ label, action, disabled, variant }: z.infer<typeof schema>) {
  return <ButtonComponent onClick={action} disabled={disabled} variant={variant}>{label}</ButtonComponent>
}