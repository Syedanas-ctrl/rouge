import { Input } from '@/components/ui/input'
import React from 'react'

const Text = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => {
  return (
    <Input ref={ref} placeholder="Sample text" className='border-none shadow-none w-fit p-1 h-fit outline-none' />
  )
})

export default Text