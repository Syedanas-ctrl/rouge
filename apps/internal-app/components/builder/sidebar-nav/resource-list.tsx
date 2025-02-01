import React from "react";
import { ResourceType } from "../types";
import UIList from "../ui-list";
import { Button } from "@workspace/ui/components/button";
import { Resource } from "../types";
import { Plus, Braces } from "lucide-react";
import { useResourceState } from "../state";

const ResourceList = () => {
  const addEmptyResource = useResourceState((state) => state.addEmptyResource);
  const { resources } = useResourceState();
  return (
    <>
      <Button onClick={addEmptyResource} variant={"secondary"} size={"default"} className="w-full mb-2">
        <Plus />
        Add Resource
      </Button>
      <UIList display="flex" list={Object.values(resources)} groups={Object.values(ResourceType)}>
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
    </>
  );
};

export default ResourceList;
