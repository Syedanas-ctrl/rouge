import { create } from "zustand"
import { CanvasBlock } from "../types/block"
import { useFunctionState } from "."
import Blocks from "../blocks"
import { FunctionType } from "../types"

interface CanvasState {
  blocks: CanvasBlock[]
  addBlock: (block: Omit<CanvasBlock, "name" | "x" | "y">) => void
  updateBlockPosition: (name: string, x: number, y: number) => void
  updateBlockSize: (name: string, width: number, height: number) => void
  updateBlockEditing: (name: string, isEditing: boolean) => void
  updateBlockProps: (name: string, props: CanvasBlock["contentProps"]) => void
}

export const useCanvasState = create<CanvasState>((set, get) => ({
  blocks: [],
  addBlock: (block) => {
    const { blocks } = get()
    const { x, y } = findFreePosition(blocks, block.width, block.height)
    const { addFunction } = useFunctionState.getState()
    const defaultPropsFunction = Blocks.find((b) => b.name === block.content)?.defaultPropsFunction
    const defaultPropsFunctionName = "function" + block.content + (blocks.length + 1);
    if (defaultPropsFunction) {
      addFunction({
        name: defaultPropsFunctionName,
        code: defaultPropsFunction,
        types: [FunctionType.JAVASCRIPT],
        isLoading: false,
      })
    } else {
      console.error("No default props function found for block", block.content)
    }
    const newBlock: CanvasBlock = { ...block, name: "block" + (blocks.length + 1) + block.content, x, y, contentProps: {
      source: defaultPropsFunctionName,
      sourceType: FunctionType.JAVASCRIPT,
      minHeight: block.height,
      minWidth: block.width,
    } }
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
  updateBlockProps: (name, props) => {
    set((state) => ({
      blocks: state.blocks.map((block) => (block.name === name ? { ...block, contentProps: props } : block)),
    }));
  },
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
