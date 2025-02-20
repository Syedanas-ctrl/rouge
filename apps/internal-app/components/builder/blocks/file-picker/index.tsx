import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import React from "react"
import { schema } from "./schema"
import { z } from "zod"

export const FilePicker = React.forwardRef<HTMLInputElement, z.infer<typeof schema>>(({ label, maxSize, accept, action }, ref) => {
  const [file, setFile] = React.useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    //check if file size is less than maxSize
    if (file && file.size > maxSize) {
      alert(`File size must be less than ${maxSize} bytes`)
      return
    }
    if (file) {
      setFile(file)
      action?.(file)
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="file-picker">{label}</Label>
      <Input ref={ref} id="file-picker" accept={accept.join(",")} type="file" onChange={handleFileChange} />
    </div>
  )
})

FilePicker.displayName = "FilePicker"