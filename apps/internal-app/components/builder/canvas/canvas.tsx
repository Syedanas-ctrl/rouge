"use client";

import { useState, useRef, useCallback } from "react";
import { Rnd } from "react-rnd";
import { useCanvasState, useJavascriptState } from "../state";
import { ToastAction } from "@workspace/ui/components/toast";
import { toast } from "@workspace/ui/hooks/use-toast";
import React from "react";
import { FunctionType } from "../types";

export function Canvas() {
  const { blocks, updateBlockPosition, updateBlockSize, updateBlockEditing } = useCanvasState();
  const { functions } = useJavascriptState();
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const checkOverlap = useCallback(
    (name: string, x: number, y: number, width: number, height: number) => {
      const overlapping = blocks.some((block) => {
        if (block.name === name) return false;
        return x < block.x + block.width && x + width > block.x && y < block.y + block.height && y + height > block.y;
      });
      console.log(overlapping);
      if (overlapping) {
        console.log("overlapping");
        toast({
          title: "Blocks overlaping.",
          description: "Please move/adjust the blocks to avoid overlapping.",
          // action: <ToastAction altText="Blocks overlaping. ">Undo</ToastAction>,
        });
      }
      return overlapping;
    },
    [blocks]
  );
  console.log("rendeer", blocks, functions);
  return (
    <div
      ref={canvasRef}
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(1.5px 1.5px at 50% 50%, var(--primary) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}>
      {blocks.map((block) => (
        <Rnd
          key={block.name}
          position={{ x: block.x, y: block.y }}
          size={{ width: block.width, height: block.height }}
          onDragStart={() => setIsDragging(true)}
          onClick={() => updateBlockEditing(block.name, true)}
          onDragStop={(e, d) => {
            setIsDragging(false);
            if (!checkOverlap(block.name, d.x, d.y, block.width, block.height)) {
              updateBlockPosition(block.name, d.x, d.y);
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            const newWidth = Number.parseFloat(ref.style.width);
            const newHeight = Number.parseFloat(ref.style.height);
            if (!checkOverlap(block.name, position.x, position.y, newWidth, newHeight)) {
              updateBlockSize(block.name, newWidth, newHeight);
              updateBlockPosition(block.name, position.x, position.y);
            }
          }}
          bounds="parent"
          minWidth={100}
          minHeight={50}
          className={`p-2 bg-background border ${isDragging ? "border-blue-500" : block.isEditing ? "border-orange-500" : "border-transparent"} cursor-move overflow-hidden`}>
          {React.cloneElement(block.content.block as React.ReactElement, {
            columns: block.contentProps?.columns,
            data:
              block.contentProps?.sourceType === FunctionType.JAVASCRIPT
                ? functions?.[block.contentProps.source]?.result?.result || []
                : [],
          })}
        </Rnd>
      ))}
    </div>
  );
}
