import { Label } from "@workspace/ui/components/label"
import { RadioGroup as RadioGroupComponent, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { schema } from "./schema"
import { z } from "zod"

export function RadioGroup({ label, default: defaultValue, options = [] }: z.infer<typeof schema>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="radio-group">{label}</Label>
      <RadioGroupComponent defaultValue={defaultValue}>
      {options.map((option) => (
        <div className="flex items-center space-x-2" key={option.value}>
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroupComponent>
    </div>
  )
}
