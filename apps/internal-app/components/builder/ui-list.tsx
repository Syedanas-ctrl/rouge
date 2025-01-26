"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import React, { useMemo, useState } from "react";
import { Block } from "./types";
import { useCanvasState } from "./state";

const UIList = ({ display, list, groups }: { display: "grid" | "flex"; list: Block[]; groups: any[] }) => {
  const [search, setSearch] = useState("");
  const addBlock = useCanvasState((state) => state.addBlock);
  const Child = display === "grid" ? GridChild : FlexChild;

  const filteredList = useMemo(() => {
    if (!search) return list;
    return list.filter((block) => block.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, list]);

  return (
    <div className="flex flex-col gap-2">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search block" />
      <Accordion type="multiple" className="w-full">
        {groups
          .filter((group) => filteredList.some((block) => block.types.includes(group)))
          .map((group) => (
            <AccordionItem key={group} value={group}>
              <AccordionTrigger>{group}</AccordionTrigger>
              <AccordionContent
                className={cn(
                  display === "grid" ? "grid grid-cols-2 gap-2 justify-items-stretch" : "flex flex-col gap-2"
                )}>
                {filteredList
                  .filter((block) => block.types.includes(group))
                  .map((block) => (
                    <Child
                      key={block.name}
                      onClick={() => {
                        addBlock({
                          content: block.block,
                          width: 300,
                          height: 10,
                        });
                      }}
                      className="flex gap-2 items-center justify-between border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-9 px-4 py-2 whitespace-nowrap">
                      {block.name}
                      {React.createElement(block.icon)}
                    </Child>
                  ))}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

const GridChild = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ children, ...props }, ref) => {
  return (
    <Button variant={"outline"} size={"sm"} className="flex items-center justify-center rounded-md" ref={ref} {...props}>
      {children}
    </Button>
  );
});

const FlexChild = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ children, ...props }, ref) => {
  return (
    <Button variant={"ghost"} size={"sm"} className="flex items-center justify-start rounded-md" ref={ref} {...props}>
      {children}
    </Button>
  );
});

GridChild.displayName = "GridChild";
FlexChild.displayName = "FlexChild";

export default UIList;
