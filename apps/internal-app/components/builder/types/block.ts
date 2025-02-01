import { LucideIcon } from "lucide-react";
import { BlockType } from "../enums";
import { BuilderElement } from "./general";

export interface Block extends BuilderElement<BlockType> {
    icon: LucideIcon;
    description: string;
    block: React.ReactNode;
}

export interface CanvasBlock {
    id: string
    content: React.ReactNode
    x: number
    y: number
    width: number
    height: number
  }