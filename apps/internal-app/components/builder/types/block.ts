import { LucideIcon } from "lucide-react";
import { BlockType } from "../enums";
import { BuilderElement } from "./general";
import { Function, FunctionType } from "./function";
import { Resource, ResourceType } from "./resource";
import { MutableState, MutableStateType } from "./mutable-state";
import { BlockName, BlockSchemaType } from "../blocks/schemas";
import { z } from "zod";
import { BlockSchemas } from "../blocks/schemas";

export interface Block<T extends BlockSchemaType> extends BuilderElement<BlockType> {
    icon: LucideIcon;
    description: string;
    component: T;
    defaultProps: z.infer<typeof BlockSchemas[T]>;
    defaultPropsFunction: string;
    attributes?: {
        minHeight: number;
        minWidth: number;
    };
}

export interface CanvasBlock {
    name: string
    content: BlockName
    x: number
    y: number
    width: number
    height: number
    isEditing: boolean //not sure if right place for this
    contentProps?: CanvasBlockContentProps
}

export interface CanvasBlockContentProps {
    source?: Function["name"] | Resource["name"] | MutableState["name"] | string
    sourceType?: FunctionType | ResourceType | MutableStateType | "string"
    minHeight: number
    minWidth: number
}