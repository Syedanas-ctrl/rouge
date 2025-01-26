import { DropResult } from "react-beautiful-dnd";
import { useCanvasState } from "../state";
import Blocks from "../blocks";
import { DragSource, DragDestination } from "../enums";

export const useDragDrop = () => {
    const canvasBlocks = useCanvasState((state) => state.blocks);
    const updateBlocks = useCanvasState((state) => state.updateBlocks);
    console.log(canvasBlocks);
    const onDragEnd = (result: DropResult) => {
      const { destination, source, draggableId } = result;
  
      // If dropped outside the droppable area
      if (!destination) return;
  
      // If dropped in the same place
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }
  
      // Dragging from sidebar to canvas
      if (source.droppableId === DragSource.BuilderBlocks && destination.droppableId === DragDestination.Canvas) {
        const draggedComponent = Blocks.find((comp) => comp.name === draggableId);
  
        const newCanvasComponents = Array.from(canvasBlocks);
        newCanvasComponents.splice(destination.index, 0, draggedComponent as never);

        updateBlocks(newCanvasComponents);
      }
  
      // Reordering within the canvas
      if (source.droppableId === DragSource.Canvas && destination.droppableId === DragDestination.Canvas) {
        const newCanvasComponents = Array.from(canvasBlocks);
        const [removed] = newCanvasComponents.splice(source.index, 1);
        newCanvasComponents.splice(destination.index, 0, removed as never);
  
        updateBlocks(newCanvasComponents);
      }
    };
  
    return { onDragEnd };
  };