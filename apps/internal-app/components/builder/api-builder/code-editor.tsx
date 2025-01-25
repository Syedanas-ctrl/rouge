"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    const lines = newValue.split("\n").length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  };
  const formatBody = () => {
    if (value) {
      try {
        const formatted = JSON.stringify(JSON.parse(value), null, 2);
        onChange(formatted);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between gap-2 p-2 border-b bg-muted/40">
        <Select value="json">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="secondary" onClick={formatBody}>
          Format
        </Button>
      </div>
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-[40px] flex flex-col items-center py-3 px-2 bg-muted/40 text-muted-foreground text-sm font-mono"
          aria-hidden="true">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>
        <textarea
          value={value}
          onChange={handleChange}
          className={cn(
            "min-h-[300px] w-full resize-none bg-background px-12 py-3 font-mono text-sm",
            "focus:outline-none focus:ring-0",
            "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
          )}
          spellCheck="false"
          placeholder="Enter your request body here..."
        />
      </div>
    </div>
  );
}
