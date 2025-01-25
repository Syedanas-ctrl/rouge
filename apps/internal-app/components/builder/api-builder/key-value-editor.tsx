"use client"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface KeyValueEditorProps {
  pairs: Record<string, string>
  onChange: (pairs: Record<string, string>) => void
}

export function KeyValueEditor({ pairs, onChange }: KeyValueEditorProps) {
  const [localPairs, setLocalPairs] = useState<Array<[string, string]>>(Object.entries(pairs))

  const updatePairs = (newPairs: Array<[string, string]>) => {
    setLocalPairs(newPairs)
    const obj = Object.fromEntries(newPairs.filter(([key, value]) => key && value))
    onChange(obj)
  }

  const addPair = () => {
    updatePairs([...localPairs, ["", ""]])
  }

  const removePair = (index: number) => {
    const newPairs = localPairs.filter((_, i) => i !== index)
    updatePairs(newPairs)
  }

  const updatePair = (index: number, key: string, value: string) => {
    const newPairs = localPairs.map((pair, i) => (i === index ? [key, value] : pair))
    updatePairs(newPairs as [string, string][])
  }

  return (
    <div className="space-y-2">
      {localPairs.map(([key, value], index) => (
        <div key={index} className="flex gap-2">
          <Input placeholder="Key" value={key} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePair(index, e.target.value, value)} />
          <Input placeholder="Value" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePair(index, key, e.target.value)} />
          <Button variant="ghost" size="icon" onClick={() => removePair(index)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={addPair} className="w-full">
        Add Pair
      </Button>
    </div>
  )
}

