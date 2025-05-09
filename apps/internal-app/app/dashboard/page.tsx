"use client";

import { Separator } from "@workspace/ui/components/separator";
import React from "react";
import Sidenav from "@/components/builder/sidebar-nav/sidebar-nav";
import { Canvas } from "@/components/builder/canvas/canvas";
import BlockManager from "@/components/builder/block-manager";
import { ResizablePanelGroup } from "@workspace/ui/components/resizable";
import { ResizablePanel } from "@workspace/ui/components/resizable";
import { ResizableHandle } from "@workspace/ui/components/resizable";
import { useCanvasState, useInjectContainerToFunctions } from "@/components/builder/state";

export default function DashboardPage() {
  const { blocks } = useCanvasState();
  const { isLoading: isInjectingContainer } = useInjectContainerToFunctions();
  const block = blocks.find((block) => block.isEditing);

  return isInjectingContainer ? (
    <div>Injecting container...</div>
  ) : (
    <main className="h-screen flex">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <Sidenav />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <Canvas />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {block && (
          <ResizablePanel defaultSize={20}>
            <BlockManager />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
      <footer className="fixed bottom-0 flex whitespace-nowrap h-6 w-full bg-white">
        <Separator className="w-full" />
      </footer>
    </main>
  );
}
