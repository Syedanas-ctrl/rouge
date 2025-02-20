import { schema } from "./schema"
import { z } from "zod"
import { Slider as SliderComponent } from "@workspace/ui/components/slider"

export function Slider({ min, max, default: defaultValue, step, action }: z.infer<typeof schema>) {
  return <SliderComponent min={min} max={max} defaultValue={[defaultValue ?? min]} step={step} onValueChange={action} />
}
