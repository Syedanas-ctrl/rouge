import { forwardRef, useEffect, useRef } from "react";

import { useState } from "react";

const ZOOM_SENSITIVITY = 0.0005;
const PAN_SENSITIVITY = 0.8;

const Zoomable = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, containerRef) => {
    if (!containerRef) return null;
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [items, setItems] = useState([
      { id: 1, color: '#3B82F6', zIndex: 1 }, // blue
      { id: 2, color: '#EF4444', zIndex: 1 }, // red
      { id: 3, color: '#10B981', zIndex: 1 }, // green
    ]);
    const [maxZIndex, setMaxZIndex] = useState(1);
  
    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = 1 - (e.deltaY * ZOOM_SENSITIVITY);
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 5);
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      const newPosition = {
        x: position.x - (mouseX - position.x) * (zoomFactor - 1),
        y: position.y - (mouseY - position.y) * (zoomFactor - 1)
      };
  
      setScale(newScale);
      setPosition(newPosition);
    };
  
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      // Only initiate canvas drag if not clicking on a Rnd element
      if (e.target === containerRef.current || e.target === containerRef.current.firstChild) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y
        });
      }
    };
  
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: (e.clientX - dragStart.x) * PAN_SENSITIVITY,
          y: (e.clientY - dragStart.y) * PAN_SENSITIVITY
        });
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    const handleItemFocus = (id) => {
      const newMaxZIndex = maxZIndex + 1;
      setMaxZIndex(newMaxZIndex);
      
      setItems(items.map(item => ({
        ...item,
        zIndex: item.id === id ? newMaxZIndex : item.zIndex
      })));
    };
  
    useEffect(() => {
      const container = containerRef.current;
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }, [scale, position]);
  
    return (
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(1.5px 1.5px at 50% 50%, #000 1px, transparent 1px)",
            backgroundSize: `${20 * scale}px ${20 * scale}px`,
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0'
          }}
        />
        
        {/* Draggable items container */}
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            width: '100vh',
            height: '100vh',
            position: 'absolute'
          }}
        >
          {children}
        </div>
  
        {/* Zoom information */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded">
          Zoom: {(scale * 100).toFixed(0)}%
        </div>
      </div>
    );
  });
  
  export default Zoomable;