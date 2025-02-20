import { schema } from "./schema"
import { z } from "zod"
import { Textarea as TextareaComponent } from "@workspace/ui/components/textarea"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"
const sizeMap = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
    "10xl": "text-10xl",
}

export function Textarea({ label, size }: z.infer<typeof schema>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="textarea">{label}</Label>
      <TextareaComponent className={cn(sizeMap[size])} />
    </div>
  )
}