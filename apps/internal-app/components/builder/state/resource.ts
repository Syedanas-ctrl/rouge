import { create } from "zustand"
import { Resource, ResourceType } from "../types"
import { RequestTypes } from "../enums"

interface ResourceState {
    resources: Record<Resource["name"], Resource>
    addEmptyResource: () => void
    addResource: (resource: Resource) => void
    updateResource: (name: Resource["name"], resource: Resource) => void
    deleteResource: (name: Resource["name"]) => void
    triggerResource: (name: Resource["name"]) => void
}

export const useResourceState = create<ResourceState>((set, get) => ({
    resources: {},
    addEmptyResource: () => set((state) => ({
        resources:
        {
            ...state.resources,
            ["Resource " + (Object.keys(state.resources).length + 1)]: {
                name: "Resource " + (Object.keys(state.resources).length + 1),
                types: [ResourceType.API],
                description: "",
                request: {
                    url: "http://localhost:3000/api/dummy-table",
                    method: RequestTypes.GET,
                    headers: {},
                    params: {},
                    body: "",
                },
                isLoading: false,
            } as Resource
        }
    })),
    addResource: (resource) => set((state) => ({ resources: { ...state.resources, [resource.name]: resource } })),
    updateResource: (name, resource) => set((state) => ({ resources: { ...state.resources, [name]: resource } })),
    deleteResource: (name) => set((state) => ({ resources: Object.fromEntries(Object.entries(state.resources).filter(([key]) => key !== name)) })),
    triggerResource: async (name) => {
        const resource = get().resources[name];
        if (!resource) return;
        try {
            set((state) => ({ resources: { ...state.resources, [name]: { ...state.resources[name], isLoading: true } as Resource } }))
            const requestOptions: RequestInit = {
                method: resource.request.method,
                headers: resource.request.headers,
            }

            if (resource.request.method !== RequestTypes.GET && resource.request.body) {
                try {
                    requestOptions.body = JSON.stringify(JSON.parse(resource.request.body));
                } catch (e) {
                    set((state) => ({
                        resources: {
                            ...state.resources,
                            [name]: {
                                ...state.resources[name],
                                response: {
                                    error: "Invalid body format",
                                    details: e instanceof Error ? e.message : "Failed to parse body content"
                                }
                            } as Resource
                        }
                    }))
                    return
                }
            }

            const res = await fetch(resource.request.url, requestOptions);
            const data = await res.json();
            set((state) => ({
                resources: {
                    ...state.resources,
                    [name]: {
                        ...state.resources[name],
                        response: {
                            status: res.status, headers: Object.fromEntries(res.headers.entries()), data
                        }
                    } as Resource
                }
            }))
        } catch (error) {
            set((state) => ({
                resources: {
                    ...state.resources,
                    [name]: {
                        ...state.resources[name],
                        response: {
                            error: "Failed to fetch",
                            details: error instanceof Error ? error.message : "Unknown error"
                        }
                    } as Resource
                }
            }))
        } finally {
            set((state) => ({
                resources: {
                    ...state.resources,
                    [name]: { ...state.resources[name], isLoading: false } as Resource
                }
            }))
        }
    }
}))