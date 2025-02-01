import { LucideIcon } from "lucide-react";
import { BlockType } from "../enums";

export interface Block {
    name: string;
    types: BlockType[];
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