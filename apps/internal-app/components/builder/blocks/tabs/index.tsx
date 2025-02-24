import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { schema } from "./schema";
import { z } from "zod";

export function Tabs({ options = [] }: z.infer<typeof schema>) {
  return (
    <TabsComponent defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        {options.map((option) => (
          <TabsTrigger key={option.value} value={option.value}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map((option) => (
        <TabsContent key={option.value} value={option.value}>
          <></>
        </TabsContent>
      ))}
    </TabsComponent>
  );
}
