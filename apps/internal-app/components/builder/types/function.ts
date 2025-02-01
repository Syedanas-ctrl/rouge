import { BuilderElement } from "./general";

export interface Function extends BuilderElement<string> {
    code: string
  }