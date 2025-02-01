import { BuilderElement } from "./general";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export enum ResourceType {
    API = "API",
    // TODO: Add QUERY
}

export interface ResourceResponse {
    status: number
    headers: Record<string, string>
    data: string
}

export interface ResourceError {
    error: string
    details: string
}

export interface ResourceRequest {
    url: string
    method: RequestMethod
    headers: Record<string, string>
    params: Record<string, string>
    body: string
}

export interface Resource extends BuilderElement<ResourceType> {
    description: string
    request: ResourceRequest
    response: ResourceResponse | ResourceError
    isLoading: boolean
}