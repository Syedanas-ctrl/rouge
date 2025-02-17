import { create } from "zustand"
import { CanvasBlock } from "../types/block"

interface CanvasState {
  blocks: CanvasBlock[]
  addBlock: (block: Omit<CanvasBlock, "name" | "x" | "y">) => void
  updateBlockPosition: (name: string, x: number, y: number) => void
  updateBlockSize: (name: string, width: number, height: number) => void
  updateBlockEditing: (name: string, isEditing: boolean) => void
}

export const useCanvasState = create<CanvasState>((set, get) => ({
  blocks: [],
  addBlock: (block) => {
    const { blocks } = get()
    const { x, y } = findFreePosition(blocks, block.width, block.height)
    const newBlock = { ...block, contentProps: block.content.defaultContentProps, name: "block" + (blocks.length + 1) + block.content.name, x, y }
    set((state) => ({ blocks: [...state.blocks, newBlock] }))
  },
  updateBlockPosition: (name, x, y) =>
    set((state) => ({
      blocks: state.blocks.map((block) => (block.name === name ? { ...block, x, y } : block)),
    })),
  updateBlockSize: (name, width, height) =>
    set((state) => ({
      blocks: state.blocks.map((block) => (block.name === name ? { ...block, width, height } : block)),
    })),
  updateBlockEditing: (name, isEditing) =>
    set((state) => ({
      blocks: state.blocks.map((block) => (block.name === name ? { ...block, isEditing } : { ...block, isEditing: !isEditing })),
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
