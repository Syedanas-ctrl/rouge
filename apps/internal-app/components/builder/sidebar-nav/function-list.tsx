import React from "react";
import UIList from "../ui-list";
import { Button } from "@workspace/ui/components/button";
import { CodeXml, Plus } from "lucide-react";
import { FunctionType, Function } from "../types";
import { useJavascriptState } from "../state";

const FunctionList = () => {
  const addEmptyFunction = useJavascriptState((state) => state.addEmptyFunction);
  const addFunction = useJavascriptState((state) => state.addFunction);
  const { functions } = useJavascriptState();
  return (
    <>
      <Button onClick={addEmptyFunction} variant={"secondary"} size={"default"} className="w-full mb-2">
        <Plus />
        Add Function
      </Button>
      <UIList display="flex" list={Object.values(functions)} groups={Object.values(FunctionType)}>
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
    </>
  );
};

export default FunctionList;
