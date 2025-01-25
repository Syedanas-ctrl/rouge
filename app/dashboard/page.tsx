import { Separator } from "@/components/ui/separator";
import React from "react";
import Sidenav from "@/components/builder/sidenav";
import Text from "@/components/builder/blocks/text";

export default function DashboardPage() {
  return (
    <main className="h-screen flex">
      <Sidenav />
      {/* workspace */}
      {/* <div className="p-4">
        {TableBlock.block}
      </div> */}
      <footer className="fixed bottom-0 flex whitespace-nowrap h-6 w-full bg-white">
        <Separator className="w-full" />
      </footer>
    </main>
  );
}
