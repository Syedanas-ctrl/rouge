import { Separator } from "@workspace/ui/components/separator";
import React from "react";
import Sidenav from "@/components/builder/sidenav";

export default function DashboardPage() {
  return (
    <main className="h-screen flex">
      <Sidenav />
      <footer className="fixed bottom-0 flex whitespace-nowrap h-6 w-full bg-white">
        <Separator className="w-full" />
      </footer>
    </main>
  );
}
