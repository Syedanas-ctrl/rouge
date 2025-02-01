"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Resource } from "../types";

export function ResponseViewer({ response }: { response: Resource["response"] }) {
  if (!response) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Click &apos;Send&apos; to get a response
        </CardContent>
      </Card>
    );
  }

  if ("error" in response) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-auto">{response.details || response.error}</pre>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="border-t py-2 flex flex-col gap-2">
      <p>
        Response
        <span className="ml-2 text-sm font-normal text-muted-foreground">Status: {response.status}</span>
      </p>
      <div>
        <Tabs defaultValue="response">
          <TabsList>
            <TabsTrigger value="response">Response</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
          </TabsList>
          <TabsContent className="overflow-scroll max-h-96" value="response">
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto">{JSON.stringify(response.data, null, 2)}</pre>
          </TabsContent>
          <TabsContent value="headers">
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto">{JSON.stringify(response.headers, null, 2)}</pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
