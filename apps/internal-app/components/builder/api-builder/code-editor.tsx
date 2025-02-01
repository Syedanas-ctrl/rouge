"use client";

import { Button } from "@workspace/ui/components/button";
import AceEditor from "react-ace";
import { Badge } from "@workspace/ui/components/badge";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: "json" | "javascript";
}

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
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
        <Badge variant="outline">{language.toUpperCase()}</Badge>
        {language === "json" && (
          <Button variant="secondary" onClick={formatBody}>
            Format
          </Button>
        )}
      </div>
      <div className="relative w-fit border border-accent overflow-hidden">
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
