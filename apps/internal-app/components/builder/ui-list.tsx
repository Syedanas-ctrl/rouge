"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import React, { useMemo, useState } from "react";

const UIList = <T extends { name: string; types: string[] }>({
  display,
  list,
  groups,
  children,
}: {
  display: "grid" | "flex";
  list: T[];
  groups: string[];
  children: (block: T) => React.ReactNode;
}) => {
  const [search, setSearch] = useState("");

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
                {filteredList.filter((block) => block.types.includes(group)).map((block) => children(block))}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default UIList;
