"use client"

import { Separator } from "@workspace/ui/components/separator";
import React from "react";
import Sidenav from "@/components/builder/sidebar-nav";
import { Canvas } from "@/components/builder/canvas/canvas";
import { DragDropContext } from "react-beautiful-dnd";
import { useDragDrop } from "@/components/builder/hooks";

export default function DashboardPage() {
  const { onDragEnd } = useDragDrop();
  return (
    <main className="h-screen flex">
      <DragDropContext onDragEnd={onDragEnd}>
        <Sidenav />
        <Canvas />
      </DragDropContext>
      <footer className="fixed bottom-0 flex whitespace-nowrap h-6 w-full bg-white">
        <Separator className="w-full" />
      </footer>
    </main>
  );
}
