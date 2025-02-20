import { schema } from "./schema"
import { z } from "zod"
import { Switch as SwitchComponent } from "@workspace/ui/components/switch"
import { Label } from "@workspace/ui/components/label"

export function Switch({ label, default: defaultValue, action }: z.infer<typeof schema>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="switch">{label}</Label>
      <SwitchComponent defaultChecked={defaultValue} onCheckedChange={action} />
    </div>
  )
}