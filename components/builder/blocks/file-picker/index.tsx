import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export const FilePicker = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">File</Label>
      <Input ref={ref} {...props} id="picture" type="file" />
    </div>
  )
})