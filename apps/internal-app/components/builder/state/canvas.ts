import { create } from "zustand"
import { CanvasBlock } from "../types/block"

interface CanvasState {
  blocks: CanvasBlock[]
  addBlock: (block: Omit<CanvasBlock, "id" | "x" | "y">) => void
  updateBlockPosition: (id: string, x: number, y: number) => void
  updateBlockSize: (id: string, width: number, height: number) => void
}

export const useCanvasState = create<CanvasState>((set, get) => ({
  blocks: [],
  addBlock: (block) => {
    const { blocks } = get()
    const { x, y } = findFreePosition(blocks, block.width, block.height)
    const newBlock = { ...block, id: Math.random().toString(36).substr(2, 9), x, y }
    set((state) => ({ blocks: [...state.blocks, newBlock] }))
  },
  updateBlockPosition: (id, x, y) =>
    set((state) => ({
      blocks: state.blocks.map((block) => (block.id === id ? { ...block, x, y } : block)),
    })),
  updateBlockSize: (id, width, height) =>
    set((state) => ({
      blocks: state.blocks.map((block) => (block.id === id ? { ...block, width, height } : block)),
    })),
}))

const CANVAS_PADDING = 20
const BLOCK_SPACING = 10

function findFreePosition(blocks: CanvasBlock[], width: number, height: number): { x: number; y: number } {
  let x = CANVAS_PADDING
  let y = CANVAS_PADDING
  let maxY = 0

  while (true) {
    const overlapping = blocks.some(
      (block) =>
        x < block.x + block.width + BLOCK_SPACING &&
        x + width + BLOCK_SPACING > block.x &&
        y < block.y + block.height + BLOCK_SPACING &&
        y + height + BLOCK_SPACING > block.y,
    )

    if (!overlapping) {
      return { x, y }
    }

    x += BLOCK_SPACING
    if (x + width + CANVAS_PADDING > window.innerWidth) {
      x = CANVAS_PADDING
      y = maxY + BLOCK_SPACING
    }

    maxY = Math.max(maxY, y + height)

    if (y + height + CANVAS_PADDING > window.innerHeight) {
      // If we've reached the bottom of the canvas, start over from the top
      x = CANVAS_PADDING
      y = CANVAS_PADDING
      maxY = 0
    }
  }
}
