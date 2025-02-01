export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type ResourceType = "API" // TODO: Add QUERY

export interface Resource {
    type: ResourceType
    name: string
    description: string
    url: string
    method: RequestMethod
    headers: Record<string, string>
    body: string
    response: string
}
