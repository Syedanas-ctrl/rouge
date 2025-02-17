import React, { Fragment, useState } from "react";
import UIList from "../ui-list";
import { Button } from "@workspace/ui/components/button";
import { CodeXml, Plus } from "lucide-react";
import { Function } from "../types";
import { useFunctionState } from "../state";
import { CodeEditor } from "../api-builder/code-editor";

const FunctionList = () => {
  const addEmptyFunction = useFunctionState((state) => state.addEmptyFunction);
  const updateFunction = useFunctionState((state) => state.updateFunction);
  const triggerFunction = useFunctionState((state) => state.triggerFunction);
  const { functions } = useFunctionState();
  const [selectedFunctions, setSelectedFunctions] = useState<Set<string>>(new Set());

  return (
    <>
      <Button onClick={addEmptyFunction} variant={"secondary"} size={"default"} className="w-full mb-2">
        <Plus />
        Add Function
      </Button>
      <UIList display="flex" list={Object.values(functions)}>
        {(func: Function) => (
          <Fragment key={func.name}>
            <Button
              onClick={() => {
                setSelectedFunctions((prev) => {
                  const next = new Set(prev);
                  next.has(func.name) ? next.delete(func.name) : next.add(func.name);
                  return next;
                });
              }}
              variant={"ghost"}
              size={"sm"}
              className="flex w-full gap-2 items-center justify-between border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-9 px-4 py-2 whitespace-nowrap">
              {func.name}
              <CodeXml />
            </Button>
            {selectedFunctions.has(func.name) && (
              <CodeEditor
                value={func.code}
                onChange={(value: string) => {
                  updateFunction(func.name, { ...func, code: value });
                }}
                language={"javascript"}
                actions={<Button variant={"default"} size={"sm"} onClick={() => triggerFunction(func.name)}>Run</Button>}
                className="h-48"
              />
            )}
          </Fragment>
        )}
      </UIList>
    </>
  );
};

export default FunctionList;
