"use client";
import React from "react";
import { BlockType, BuilderTabs, DragSource } from "./enums";
import UIList from "./ui-list";
import { RequestInterface } from "./api-builder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Separator } from "@workspace/ui/components/separator";
import blocks from "./blocks";

const Sidenav = () => {
  return (
    <section className="w-fit min-w-[20%] max-w-[40%] overflow-scroll h-full p-4 border-r border-accent">
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
          <UIList display="grid" list={blocks} groups={Object.values(BlockType)} dragSource={DragSource.BuilderBlocks} />
        </TabsContent>
        <TabsContent value={BuilderTabs.API}>
          <RequestInterface />
        </TabsContent>
        <TabsContent value={BuilderTabs.JS}>
          <UIList display="flex" list={[]} groups={[]} dragSource={DragSource.BuilderBlocks} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Sidenav;
