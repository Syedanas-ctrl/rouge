import { BuilderElement } from "./general";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export enum ResourceType {
    API = "API",
    // TODO: Add QUERY
}

export interface Resource extends BuilderElement<ResourceType> {
    description: string
    url: string
    method: RequestMethod
    headers: Record<string, string>
    body: string
    response: string
}
