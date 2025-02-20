import { Checkbox as CheckboxComponent } from "@workspace/ui/components/checkbox"
import { schema } from "./schema"
import { z } from "zod"

export function Checkbox({ default: checked, action, label }: z.infer<typeof schema>) {
  return <CheckboxComponent checked={checked} onCheckedChange={action}>{label}</CheckboxComponent>
}