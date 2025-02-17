import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { SaveAllIcon, SaveIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { CodeEditor } from "../api-builder/code-editor";
import { useCanvasState, useJavascriptState, useResourceState } from "../state";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Badge } from "@workspace/ui/components/badge";

const BlockManager = () => {
  const { blocks } = useCanvasState();
  const { resources } = useResourceState();
  const { functions } = useJavascriptState();
  const block = blocks.find((block) => block.isEditing);

  return (
    <section className="ml-auto overflow-scroll h-full p-4">
      <div className="flex justify-between gap-2">
        <Input
          placeholder="block name"
          value={block?.name}
          onChange={(e) => {}}
          className="font-bold border-none w-fit"
        />
        <Button variant="default" size="icon">
          <SaveIcon className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        <Label>Source</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a source" />
          </SelectTrigger>
          <SelectContent>
            {[...Object.entries(functions), ...Object.entries(resources)].map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label>Columns</Label>
        {block?.contentProps?.columns.map((column) => <Badge>{column.header}</Badge>)}
        <div className="rounded-md overflow-scroll">
          <CodeEditor value={""} onChange={() => {}} language="javascript" />
        </div>
      </div>
    </section>
  );
};

export default BlockManager;
