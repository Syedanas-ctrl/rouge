import { LucideIcon } from "lucide-react";
import { BlockType } from "../enums";

export interface Block {
    name: string;
    types: BlockType[];
    icon: LucideIcon;
    description: string;
    block: React.ReactNode;
}

