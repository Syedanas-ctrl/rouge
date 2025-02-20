import { Button } from "@workspace/ui/components/button"
import {
  Dialog as DialogComponent,
  DialogContent,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { schema } from "./schema"
import { z } from "zod"

export function Dialog({ label }: z.infer<typeof schema>) {
  return (
    <DialogComponent>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <></>
      </DialogContent>
    </DialogComponent>
  )
}
