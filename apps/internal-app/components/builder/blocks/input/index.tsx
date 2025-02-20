import { Input as InputComponent } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { schema } from "./schema"
import { z } from "zod"

export function Input({ label, action, placeholder }: z.infer<typeof schema>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="input">{label}</Label>
      <InputComponent placeholder={placeholder} onChange={action} />
    </div>
  )
}