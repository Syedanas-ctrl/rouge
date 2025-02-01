"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { RequestAttributes, RequestTypes } from "../enums";
import { KeyValueEditor, ResponseViewer } from ".";
import { CodeEditor } from "./code-editor";
import { RequestMethod, Resource, ResourceRequest } from "../types";
import { useResourceState } from "../state/resource";

export function RequestInterface({ resource }: { resource: Resource }) {
  const triggerResource = useResourceState((state) => state.triggerResource);
  const response = useResourceState((state) => state.resources[resource.name]?.response);
  const isLoading = useResourceState((state) => state.resources[resource.name]?.isLoading);

  // Local state
  const [url, setUrl] = useState<ResourceRequest["url"]>(resource.request.url);
  const [method, setMethod] = useState<RequestMethod>(resource.request.method);
  const [headers, setHeaders] = useState<ResourceRequest["headers"]>(resource.request.headers);
  const [params, setParams] = useState<ResourceRequest["params"]>(resource.request.params);
  const [body, setBody] = useState<ResourceRequest["body"]>(resource.request.body);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <Select value={method} onValueChange={(value: RequestMethod) => setMethod(value)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(RequestTypes).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          placeholder="Enter request URL"
          className="flex-1"
        />
        <Button onClick={() => triggerResource(resource.name)} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>

      <Tabs defaultValue={RequestAttributes.Headers} className="w-full">
        <TabsList>
          <TabsTrigger value={RequestAttributes.Headers}>{RequestAttributes.Headers}</TabsTrigger>
          <TabsTrigger value={RequestAttributes.Params}>{RequestAttributes.Params}</TabsTrigger>
          <TabsTrigger value={RequestAttributes.Body}>{RequestAttributes.Body}</TabsTrigger>
        </TabsList>
        <TabsContent value={RequestAttributes.Headers}>
          <KeyValueEditor pairs={headers} onChange={setHeaders} />
        </TabsContent>
        <TabsContent value={RequestAttributes.Params}>
          <KeyValueEditor pairs={params} onChange={setParams} />
        </TabsContent>
        <TabsContent value={RequestAttributes.Body}>
          <CodeEditor value={body} onChange={setBody} language="json" />
        </TabsContent>
      </Tabs>
      {response && (
        <div className="mt-6">
          <ResponseViewer response={response} />
        </div>
      )}
    </div>
  );
}
