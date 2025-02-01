"use client";

import { Button } from "@workspace/ui/components/button";
import AceEditor from "react-ace";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: "json" | "javascript";
  actions?: React.ReactNode;
  className?: string;
  }

export function CodeEditor({ value, onChange, language, actions, className }: CodeEditorProps) {
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
    <div className="rounded-md border overflow-hidden">
      <div className="flex items-center justify-between gap-2 p-2 border-b bg-muted/40">
        <Badge variant="outline">{language.toUpperCase()}</Badge>
        {language === "json" && (
          <Button variant="secondary" onClick={formatBody}>
            Format
          </Button>
        )}
        {actions}
      </div>
      <div className={cn("relative w-fit border border-accent overflow-x-hidden overflow-y-scroll", className)}>
        <AceEditor
          placeholder="Enter your code block here..."
          mode={language}
          theme="monokai"
          name="blah2"
          fontSize={14}
          lineHeight={19}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={value}
          onChange={onChange}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            enableMobileMenu: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
