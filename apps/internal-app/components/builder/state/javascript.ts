import { create } from "zustand"
import { Function, FunctionType } from "../types";

interface JavascriptState {
  functions: Record<Function["name"], Function>
  addFunction: (func: Function) => void
  addEmptyFunction: () => void
  updateFunction: (name: Function["name"], func: Function) => void
  deleteFunction: (name: Function["name"]) => void
  triggerFunction: (name: Function["name"]) => void
}

export const useJavascriptState = create<JavascriptState>((set, get) => ({
  functions: {},
  addFunction: (func) => set((state) => ({ functions: { ...state.functions, [func.name]: func } })),
  addEmptyFunction: () => set((state) => ({
    functions:
    {
      ...state.functions,
      ["Function " + (Object.keys(state.functions).length + 1)]: {
        name: "Function " + (Object.keys(state.functions).length + 1),
        code: "",
        types: [FunctionType.JAVASCRIPT]
      } as Function
    }
  })),
  updateFunction: (name, func) => set((state) => ({ functions: { ...state.functions, [name]: func } })),
  deleteFunction: (name) => set((state) => ({ functions: Object.fromEntries(Object.entries(state.functions).filter(([key]) => key !== name)) })),
  triggerFunction: (name) => {
    const func = get().functions[name];
    if (!func) return;
    set((state) => ({ functions: { ...state.functions, [name]: { ...func, isLoading: true } } }));
    // TODO: Run function using webcontainers
    const result = eval(func.code);
    set((state) => ({ functions: { ...state.functions, [name]: { ...func, result, isLoading: false } } }));
  }
}))