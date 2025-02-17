import { LucideIcon } from "lucide-react";
import { BlockType } from "../enums";
import { BuilderElement } from "./general";
import { Function, FunctionType } from "./function";
import { Resource, ResourceType } from "./resource";
import { TableColumn } from "./table";

export interface Block extends BuilderElement<BlockType> {
    icon: LucideIcon;
    description: string;
    block: React.ReactNode;
    defaultContentProps?: CanvasBlockContentProps;
}

export interface CanvasBlock {
    name: string
    content: Block
    x: number
    y: number
    width: number
    height: number
    isEditing: boolean //not sure if right place for this
    contentProps?: CanvasBlockContentProps
}

export interface CanvasBlockContentProps {
    source: Function["name"] | Resource["name"]
    sourceType: FunctionType | ResourceType
    columns: TableColumn[]
}