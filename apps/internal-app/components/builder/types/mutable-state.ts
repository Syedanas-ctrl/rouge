import { BuilderElement } from "./general";

export enum MutableStateType {
    JAVASCRIPT_VARIABLE = "javascript_variable",
}

export interface MutableState extends BuilderElement<MutableStateType> {
    state: string | number | boolean | object | undefined
    isLoading: boolean
}