"use client"

import { useState, useRef, useCallback } from "react"
import { Rnd } from "react-rnd"
import { useCanvasState } from "../state"

export function Canvas() {
  const { blocks, updateBlockPosition, updateBlockSize } = useCanvasState()
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const checkOverlap = useCallback(
    (id: string, x: number, y: number, width: number, height: number) => {
      return blocks.some((block) => {
        if (block.id === id) return false
        return x < block.x + block.width && x + width > block.x && y < block.y + block.height && y + height > block.y
      })
    },
    [blocks],
  )

  return (
    <div
      ref={canvasRef}
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(1.5px 1.5px at 50% 50%, var(--primary) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {blocks.map((block) => (
        <Rnd
          key={block.id}
          position={{ x: block.x, y: block.y }}
          size={{ width: block.width, height: block.height }}
          onDragStart={() => setIsDragging(true)}
          onDragStop={(e, d) => {
            setIsDragging(false)
            if (!checkOverlap(block.id, d.x, d.y, block.width, block.height)) {
              updateBlockPosition(block.id, d.x, d.y)
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            const newWidth = Number.parseFloat(ref.style.width)
            const newHeight = Number.parseFloat(ref.style.height)
            if (!checkOverlap(block.id, position.x, position.y, newWidth, newHeight)) {
              updateBlockSize(block.id, newWidth, newHeight)
              updateBlockPosition(block.id, position.x, position.y)
            }
          }}
          bounds="parent"
          minWidth={100}
          minHeight={50}
            className={`p-2 bg-background border ${isDragging ? "border-blue-500" : "border-orange-500"} cursor-move overflow-hidden`}
          >
            {block.content}
        </Rnd>
      ))}
    </div>
  )
}

