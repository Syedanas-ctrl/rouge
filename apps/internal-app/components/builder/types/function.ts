import { BuilderElement } from "./general";

export enum FunctionType {
    JAVASCRIPT = "javascript",
}

export type FunctionResult = {
    result: unknown,
    error: string
}

export interface Function extends BuilderElement<FunctionType> {
    code: string,
    isLoading: boolean,
    result?: FunctionResult
}