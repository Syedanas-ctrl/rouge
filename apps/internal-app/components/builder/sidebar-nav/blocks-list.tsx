import React from "react";
import UIList from "../ui-list";
import { Button } from "@workspace/ui/components/button";
import { Block } from "../types";
import { BlockType } from "../enums";
import { useCanvasState } from "../state";
import blocks from "../blocks";

const BlocksList = () => {
  const addBlock = useCanvasState((state) => state.addBlock);
  return (
    <UIList display="grid" list={blocks} groups={Object.values(BlockType)}>
      {(block: Block) => (
        <Button
          key={block.name}
          onClick={() =>
            addBlock({
              content: block,
              width: 300,
              height: 10,
              isEditing: false,
            })
          }
          variant={"outline"}
          size={"sm"}
          className="flex gap-2 items-center justify-between border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-9 px-4 py-2 whitespace-nowrap">
          {block.name}
          {React.createElement(block.icon)}
        </Button>
      )}
    </UIList>
  );
};

export default BlocksList;
