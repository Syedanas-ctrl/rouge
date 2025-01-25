"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestAttributes, RequestTypes } from "../enums";
import { Textarea } from "@/components/ui/textarea";
import { KeyValueEditor, ResponseViewer } from ".";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export function RequestInterface() {
  const [url, setUrl] = useState("https://catfact.ninja/fact");
  const [method, setMethod] = useState<RequestMethod>("GET");
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [params, setParams] = useState<Record<string, string>>({});
  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method,
        headers,
      });
      const data = await res.json();
      setResponse({
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        data,
      });
    } catch (error) {
      setResponse({
        error: "Failed to fetch",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <Select value={method} onValueChange={(value) => setMethod(value as RequestMethod)}>
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
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter request URL"
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={isLoading}>
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
          <Textarea
            rows={10}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <ResponseViewer response={response} />
      </div>
    </div>
  );
}
