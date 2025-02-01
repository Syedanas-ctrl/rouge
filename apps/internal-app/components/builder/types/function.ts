import { BuilderElement } from "./general";

export enum FunctionType {
    JAVASCRIPT = "javascript",
}

export interface Function extends BuilderElement<FunctionType> {
    code: string
  }