import { create } from "zustand"
import { Resource } from "../types"

interface ResourceState {
  resources: Record<Resource["name"], Resource>
  addResource: (resource: Resource) => void
  updateResource: (name: Resource["name"], resource: Resource) => void
  deleteResource: (name: Resource["name"]) => void
}

export const useResourceState = create<ResourceState>((set) => ({
  resources: {},
  addResource: (resource) => set((state) => ({ resources: { ...state.resources, [resource.name]: resource } })),
  updateResource: (name, resource) => set((state) => ({ resources: { ...state.resources, [name]: resource } })),
  deleteResource: (name) => set((state) => ({ resources: Object.fromEntries(Object.entries(state.resources).filter(([key]) => key !== name)) })),
}))