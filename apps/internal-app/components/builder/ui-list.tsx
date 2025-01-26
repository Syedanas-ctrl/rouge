"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import React, { useMemo, useState } from "react";
import { DragSource } from "./enums";
import { Draggable, Droppable } from "react-beautiful-dnd";

const UIList = ({
  display,
  list,
  groups,
  dragSource,
}: {
  display: "grid" | "flex";
  list: any[];
  groups: any[];
  dragSource: DragSource;
}) => {
  const [search, setSearch] = useState("");
  const Child = display === "grid" ? GridChild : FlexChild;

  const filteredList = useMemo(() => {
    if (!search) return list;
    return list.filter((block) => block.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, list]);

  return (
    <div className="flex flex-col gap-2">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search block" />
      <Droppable droppableId={dragSource} isDropDisabled={true}>
        {(provided) => (
          <Accordion type="multiple" className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
            {groups
              .filter((group) => filteredList.some((block) => block.types.includes(group)))
              .map((group) => (
                <AccordionItem key={group} value={group}>
                  <AccordionTrigger>{group}</AccordionTrigger>
                  <AccordionContent
                    className={cn(
                      display === "grid" ? "grid grid-cols-3 gap-2 justify-items-stretch" : "flex flex-col gap-2"
                    )}>
                    {filteredList
                      .filter((block) => block.types.includes(group))
                      .map((block, index) => (
                        <Draggable key={block.name} draggableId={block.name} index={index}>
                          {(provided) => (
                            <div
                              key={block.name}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex gap-2 items-center justify-between border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-9 px-4 py-2 whitespace-nowrap"
                              >
                              {block.name}
                              {React.createElement(block.icon)}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </AccordionContent>
                </AccordionItem>
              ))}
            {provided.placeholder}
          </Accordion>
        )}
      </Droppable>
    </div>
  );
};

const GridChild = React.forwardRef<HTMLButtonElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <Button variant={"outline"} size={"sm"} className="flex items-center justify-center rounded-md" ref={ref}>
      {children}
    </Button>
  );
});

const FlexChild = React.forwardRef<HTMLButtonElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <Button variant={"ghost"} size={"sm"} className="flex items-center justify-start rounded-md" ref={ref}>
      {children}
    </Button>
  );
});

GridChild.displayName = "GridChild";
FlexChild.displayName = "FlexChild";

export default UIList;
