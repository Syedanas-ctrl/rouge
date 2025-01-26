"use client";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { useCanvasState } from "../state";

export function Canvas() {
  const canvasBlocks = useCanvasState((state) => state.blocks);
  return (
    <div className="flex h-screen w-screen">
      <div
        className="flex-1 p-4 bg-gray-200"
        style={{
          backgroundImage: "radial-gradient(1.5px 1.5px at 50% 50%, rgba(0, 0, 0, 0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}>
        <Droppable droppableId="canvas">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="h-full">
              {canvasBlocks.map((comp, index) => (
                <Draggable key={comp.name} draggableId={comp.name} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 mb-2 text-black bg-white border rounded shadow-md cursor-move">
                      {comp.name}
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
