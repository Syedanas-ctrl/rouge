"use client";
import React, { useState } from "react";
import { BuilderTabs } from "./enums";
import UIList from "./ui-list";
import RequestInterface from "./api-builder/request-interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";

const Sidenav = () => {
  const [selectedTab, setSelectedTab] = useState(BuilderTabs.UI);
  return (
    <section className="w-fit min-w-[20%] max-w-[40%] fixed overflow-scroll h-full p-4 border-r border-accent">
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
      </Tabs>
      {/* <nav className="flex flex-col gap-2">
        <div className="flex gap-2">
          {Object.values(BuilderTabs).map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? "secondary" : "outline"}
              className="grow"
              size="sm"
              onClick={() => setSelectedTab(tab)}>
              {tab}
            </Button>
          ))}
        </div>
        <Input placeholder="Search ui" />
      </nav>
      <div>
        <UIList display={selectedTab === BuilderTabs.UI ? "grid" : "flex"} />
      </div>
      <div className="py-10">
        <RequestInterface />
      </div> */}
    </section>
  );
};

export default Sidenav;
