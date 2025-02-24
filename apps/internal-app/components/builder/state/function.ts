import { create } from "zustand"
import { Function, FunctionType } from "../types";
import useWebContainer from "../hooks/webcontainer";
import { useEffect } from "react";

interface FunctionState {
  functions: Record<Function["name"], Function>
  addFunction: (func: Function) => void
  addEmptyFunction: () => void
  updateFunction: (name: Function["name"], func: Function) => void
  deleteFunction: (name: Function["name"]) => void
  triggerFunction: (name: Function["name"]) => void

  // webcontainer functions
  writeContainerFunction: ((functions: Record<Function["name"], Function["code"]>) => Promise<string>) | null;
  setWriteContainerFunction: (writeContainerFunction: any) => void;
  runContainerFunction: ((name: Function["name"]) => Promise<string>) | null;
  setRunContainerFunction: (runContainerFunction: any) => void;
}

export const useFunctionState = create<FunctionState>((set, get) => ({
  functions: {},
  addFunction: async (func) => {
    set((state) => ({ functions: { ...state.functions, [func.name]: func } }))
    await get().writeContainerFunction?.(Object.fromEntries(Object.values(get().functions).map((func) => ([func.name, func.code]))));
  },
  addEmptyFunction: async () => {
    const newName = `Function ${Object.keys(get().functions).length + 1}`;
    const newFunc: Function = {
      name: newName,
      code: "",
      types: [FunctionType.JAVASCRIPT],
      isLoading: false,
    };
    set((state) => ({
      functions:
        {
          ...state.functions,
      [newName]: newFunc
      }
    }))
    const newFunction = get().functions[newName];
    if (!newFunction) return;
    await get().writeContainerFunction?.(Object.fromEntries(Object.values(get().functions).map((func) => ([func.name, func.code]))));
  },
  updateFunction: async (name, func) => {
    set((state) => ({ functions: { ...state.functions, [name]: func } }))
    await get().writeContainerFunction?.(Object.fromEntries(Object.values(get().functions).map((func) => ([func.name, func.code]))));
  },
  deleteFunction: async (name) => {
    set((state) => ({ functions: Object.fromEntries(Object.entries(state.functions).filter(([key]) => key !== name)) }))
    await get().writeContainerFunction?.(Object.fromEntries(Object.values(get().functions).map((func) => ([func.name, func.code]))));
  },
  triggerFunction: (name) => {
    const func = get().functions[name];
    if (!func) return;
    set((state) => ({ functions: { ...state.functions, [name]: { ...func, isLoading: true } } }));
    // TODO: Run function using webcontainers
    const result = eval(func.code);
    set((state) => ({ functions: { ...state.functions, [name]: { ...func, result, isLoading: false } } }));
    get().runContainerFunction?.(name);
  },

  // webcontainer functions
  writeContainerFunction: null,
  setWriteContainerFunction: (writeContainerFunction) => set({ writeContainerFunction }),
  runContainerFunction: null,
  setRunContainerFunction: (runContainerFunction) => set({ runContainerFunction }),
}))

export const useInjectContainerToFunctions = () => {
  const { writeFunctions, runFunctions, isLoading } = useWebContainer();
  const setWriteContainerFunction = useFunctionState((state) => state.setWriteContainerFunction);
  const setRunContainerFunction = useFunctionState((state) => state.setRunContainerFunction);

  useEffect(() => {
    if (!isLoading) {
      setWriteContainerFunction(writeFunctions);
      setRunContainerFunction(runFunctions);
    }
  }, [writeFunctions, runFunctions, isLoading, setWriteContainerFunction, setRunContainerFunction]);

  return {
    isLoading,
  }
};
