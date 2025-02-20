import { Button } from "@workspace/ui/components/button"
import {
  Sheet as SheetComponent,
  SheetContent,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { schema } from "./schema"
import { z } from "zod"

export function Sheet({ label }: z.infer<typeof schema>) {
  return (
    <SheetComponent>
      <SheetTrigger asChild>
        <Button variant="outline">{label}</Button>
      </SheetTrigger>
      <SheetContent>
        <></>
      </SheetContent>
    </SheetComponent>
  )
}
