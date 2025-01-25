"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UIList = ({ display, list, groups }: { display: "grid" | "flex", list: any[], groups: any[] }) => {
  const [search, setSearch] = useState("");
  const Child = display === "grid" ? GridChild : FlexChild;
  
  const filteredList = useMemo(() => {
    if (!search) return list;
    return list.filter((block) => block.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search block" />
      <Accordion type="multiple" className="w-full">
        {groups.map((group) => (
          <AccordionItem key={group} value={group}>
          <AccordionTrigger>{group}</AccordionTrigger>
          <AccordionContent
            className={cn(display === "grid" ? "grid grid-cols-3 gap-2 justify-items-stretch" : "flex flex-col gap-2")}>
              {filteredList.filter((block) => block.types.includes(group)).map((block) => (
              <Child key={block.name}>
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

const GridChild = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button variant={"outline"} size={"sm"} className="flex items-center justify-center rounded-md">
      {children}
    </Button>
  );
};

const FlexChild = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button variant={"ghost"} size={"sm"} className="flex items-center justify-start rounded-md">
      {children}
    </Button>
  );
};

export default UIList;
