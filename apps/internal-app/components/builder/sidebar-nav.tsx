"use client";
import React from "react";
import { BlockType, BuilderTabs } from "./enums";
import UIList from "./ui-list";
import { RequestInterface } from "./api-builder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Separator } from "@workspace/ui/components/separator";
import blocks from "./blocks";
import { useResourceState, useJavascriptState, useCanvasState } from "./state";
import { Button } from "@workspace/ui/components/button";
import { Braces, CodeXml } from "lucide-react";
import { Block, Function, Resource } from "./types";

const Sidenav = () => {
  const { resources } = useResourceState();
  const { functions } = useJavascriptState();
  const addBlock = useCanvasState((state) => state.addBlock);
  return (
    <section className="mr-auto overflow-scroll h-full p-4 border-r border-accent">
      <Tabs defaultValue={BuilderTabs.UI}>
        <TabsList className="grid grid-cols-3 gap-2">
          {Object.values(BuilderTabs).map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="pt-2">
          <Separator />
        </div>
        <TabsContent value={BuilderTabs.UI}>
          <UIList display="grid" list={blocks} groups={Object.values(BlockType)}>
            {(block: Block) => (
              <Button
                key={block.name}
                onClick={() => addBlock({ content: block.block, width: 300, height: 10 })}
                variant={"outline"}
                size={"sm"}
                className="flex gap-2 items-center justify-between border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-9 px-4 py-2 whitespace-nowrap">
                {block.name}
                {React.createElement(block.icon)}
              </Button>
            )}
          </UIList>
        </TabsContent>
        <TabsContent value={BuilderTabs.API}>
          <UIList display="flex" list={Object.values(resources)} groups={[]}>
            {(resource: Resource) => (
              <Button
                key={resource.name}
                onClick={() => {}}
                variant={"ghost"}
                size={"sm"}
                className="flex gap-2 items-center justify-between border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-9 px-4 py-2 whitespace-nowrap">
                {resource.name}
                <Braces />
              </Button>
            )}
          </UIList>
          <RequestInterface />
        </TabsContent>
        <TabsContent value={BuilderTabs.JS}>
          <UIList display="flex" list={Object.values(functions)} groups={[]}>
            {(func: Function) => (
              <Button
                key={func.name}
                onClick={() => {}}
                variant={"ghost"}
                size={"sm"}
                className="flex gap-2 items-center justify-between border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-9 px-4 py-2 whitespace-nowrap">
                {func.name}
                <CodeXml />
              </Button>
            )}
          </UIList>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Sidenav;
