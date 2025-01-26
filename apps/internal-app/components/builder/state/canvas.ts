import { create } from "zustand";
import { Block } from "../types";

type CanvasState = {
  blocks: Block[];
};

type Actions = {
  updateBlocks: (blocks: Block[]) => void;
};

export const useCanvasState = create<CanvasState & Actions>()((set) => ({
  blocks: [],
  updateBlocks: (blocks: Block[]) => set({ blocks }),
}));
