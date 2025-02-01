import { create } from "zustand"
import { Resource, ResourceType } from "../types"
import { RequestTypes } from "../enums"

interface ResourceState {
    resources: Record<Resource["name"], Resource>
    addEmptyResource: () => void
    addResource: (resource: Resource) => void
    updateResource: (name: Resource["name"], resource: Resource) => void
    deleteResource: (name: Resource["name"]) => void
}

export const useResourceState = create<ResourceState>((set) => ({
    resources: {},
    addEmptyResource: () => set((state) => ({
        resources:
        {
            ...state.resources,
            ["Resource " + (Object.keys(state.resources).length + 1)]: {
                name: "Resource " + (Object.keys(state.resources).length + 1),
                types: [ResourceType.API],
                url: "https://catfact.ninja/fact",
                method: RequestTypes.GET,
            } as Resource
        }
    })),
    addResource: (resource) => set((state) => ({ resources: { ...state.resources, [resource.name]: resource } })),
    updateResource: (name, resource) => set((state) => ({ resources: { ...state.resources, [name]: resource } })),
    deleteResource: (name) => set((state) => ({ resources: Object.fromEntries(Object.entries(state.resources).filter(([key]) => key !== name)) })),
}))