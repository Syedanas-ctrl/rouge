import React, { Fragment, useState } from "react";
import UIList from "../ui-list";
import { Button } from "@workspace/ui/components/button";
import { Resource } from "../types";
import { Plus, Braces } from "lucide-react";
import { useResourceState } from "../state";
import { RequestInterface } from "../api-builder";

const ResourceList = () => {
  const addEmptyResource = useResourceState((state) => state.addEmptyResource);
  const { resources } = useResourceState();
  const [selectedResources, setSelectedResources] = useState<Set<string>>(new Set());
  return (
    <>
      <Button onClick={addEmptyResource} variant={"secondary"} size={"default"} className="w-full mb-2">
        <Plus />
        Add Resource
      </Button>
      <UIList display="flex" list={Object.values(resources)}>
        {(resource: Resource) => (
          <Fragment key={resource.name}>
            <Button
              onClick={() => {
                setSelectedResources(prev => {
                    const next = new Set(prev);
                    next.has(resource.name) ? next.delete(resource.name) : next.add(resource.name);
                    return next;
                  });
              }}
              variant={"ghost"}
              size={"sm"}
              className="flex w-full gap-2 items-center justify-between border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-9 px-4 py-2 whitespace-nowrap">
              {resource.name}
              <Braces />
            </Button>
            {selectedResources.has(resource.name) && <RequestInterface resource={resource} />}
          </Fragment>
        )}
      </UIList>
    </>
  );
};

export default ResourceList;
