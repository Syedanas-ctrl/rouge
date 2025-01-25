import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { ComponentTypes } from "./enums/general";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const UIList = ({ display }: { display: "grid" | "flex" }) => {
  const Child = display === "grid" ? GridChild : FlexChild;
  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.values(ComponentTypes).map((component) => (
        <AccordionItem key={component} value={component}>
          <AccordionTrigger>{component}</AccordionTrigger>
          <AccordionContent
            className={cn(display === "grid" ? "grid grid-cols-3 gap-2 justify-items-stretch" : "flex flex-col gap-2")}>
            {Object.values(ComponentTypes).map((builderComponent, index) => (
              <Child key={builderComponent}>List {index + 1}</Child>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
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
