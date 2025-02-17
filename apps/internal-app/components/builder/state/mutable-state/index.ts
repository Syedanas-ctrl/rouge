import { create } from "zustand"
import { SAMPLE_TABLE_DATA, SAMPLE_TABLE_DATA_NAME } from "./samples";
import { MutableState, MutableStateType } from "../../types";

interface MutableStateInterface {
  states: Record<MutableState["name"], MutableState>
  addState: (mutableState: MutableState) => void
  addEmptyState: () => void
  updateState: (name: MutableState["name"], mutableState: MutableState) => void
  deleteState: (name: MutableState["name"]) => void
}

export const useMutableState = create<MutableStateInterface>((set, get) => ({
  states: {
    [SAMPLE_TABLE_DATA_NAME]: {
      name: SAMPLE_TABLE_DATA_NAME,
      state: SAMPLE_TABLE_DATA,
      types: [MutableStateType.JAVASCRIPT_VARIABLE],
      isLoading: false,
    },
  },
  addState: (mutableState) => set((state) => ({ states: { ...state.states, [mutableState.name]: mutableState } })),
  addEmptyState: () => set((state) => ({
    states:
    {
      ...state.states,
      ["State " + (Object.keys(state.states).length + 1)]: {
        name: "State " + (Object.keys(state.states).length + 1),
        types: [MutableStateType.JAVASCRIPT_VARIABLE]
      } as MutableState
    }
  })),
  updateState: (name, mutableState) => set((state) => ({ states: { ...state.states, [name]: mutableState } })),
  deleteState: (name) => set((state) => ({ states: Object.fromEntries(Object.entries(state.states).filter(([key]) => key !== name)) })),
}))