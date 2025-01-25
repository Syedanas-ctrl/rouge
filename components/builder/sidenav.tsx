"use client";
import React, { useState } from "react";
import { BuilderTabs } from "./enums";
import UIList from "./ui-list";
import { RequestInterface } from "./api-builder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";

const Sidenav = () => {
  const [selectedTab, setSelectedTab] = useState(BuilderTabs.UI);
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
          <UIList display="grid" />
        </TabsContent>
        <TabsContent value={BuilderTabs.API}>
          <RequestInterface />
        </TabsContent>
        <TabsContent value={BuilderTabs.JS}>
          <UIList display="flex" />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Sidenav;
