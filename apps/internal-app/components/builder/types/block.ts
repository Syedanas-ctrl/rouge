import { LucideIcon } from "lucide-react";
import { BlockType } from "../enums";
import { BuilderElement } from "./general";
import { Function } from "./function";
import { Resource } from "./resource";
import { TableColumn } from "./table";

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
    contentProps?: CanvasBlockContentProps
}

export interface CanvasBlockContentProps {
    source: Function["name"] | Resource["name"]
    columns: TableColumn[]
}