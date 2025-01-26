import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { CodeEditor } from "../api-builder/code-editor";

const BlockManager = () => {
  return (
    <section className="ml-auto overflow-scroll h-full p-4">
      <div className="flex justify-between gap-2">
        <Input placeholder="block name" className="font-bold border-none w-fit" />
        <Button variant="outline" size="icon">
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        <Label>Source</Label>
        <Input placeholder="Source" className="w-full" />
        <div className="rounded-md overflow-scroll">
          <CodeEditor value={""} onChange={() => {}} language="javascript" />
        </div>
      </div>
    </section>
  );
};

export default BlockManager;
