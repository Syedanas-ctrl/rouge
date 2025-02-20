"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Drawer as DrawerComponent,
  DrawerContent,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { schema } from "./schema"
import { z } from "zod"

export function Drawer({ label }: z.infer<typeof schema>) {

  return (
    <DrawerComponent>
      <DrawerTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <></>
      </DrawerContent>
    </DrawerComponent>
  )
}
