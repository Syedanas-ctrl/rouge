"use client";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { useCanvasState } from "../state";
import { DragDestination } from "../enums";

export function Canvas() {
  const canvasBlocks = useCanvasState((state) => state.blocks);
  return (
    <div className="flex h-screen w-screen">
      <div
        className="flex-1 p-4"
        style={{
          backgroundImage: "radial-gradient(1.5px 1.5px at 50% 50%, var(--primary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}>
        <Droppable droppableId={DragDestination.Canvas}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="h-full flex flex-col gap-2">
              {canvasBlocks.map((comp, index) => (
                <Draggable key={comp.name} draggableId={comp.name} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="cursor-move bg-background border border-orange-500 p-2 w-fit"
                      >
                      {comp.block}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
