import { Input } from '@workspace/ui/components/input'
import { cn } from '@workspace/ui/lib/utils'
import React from 'react'
import { z } from 'zod';
import { schema } from './schema'

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

export const Text = React.forwardRef<HTMLInputElement, z.infer<typeof schema>>(({ size }, ref) => {
  return (
    <Input ref={ref} placeholder="Sample text" className={cn('border-none shadow-none w-fit p-1 h-fit outline-none', sizeMap[size])} />
  )
})

Text.displayName = "Text";