"use client";
import React from "react";
import { BuilderTabs } from "../enums";
import { RequestInterface } from "../api-builder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Separator } from "@workspace/ui/components/separator";
import BlocksList from "./blocks-list";
import ResourceList from "./resource-list";
import FunctionList from "./function-list";

const Sidenav = () => {
  
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
          <BlocksList />
        </TabsContent>
        <TabsContent value={BuilderTabs.API}>
          <ResourceList />
          <RequestInterface />
        </TabsContent>
        <TabsContent value={BuilderTabs.JS}>
          <FunctionList />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Sidenav;
