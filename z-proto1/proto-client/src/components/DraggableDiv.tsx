import React, { useRef, useState } from 'react';

function DraggableDiv() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  const handleMouseDown = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '100px',
        height: '50px',
        backgroundColor: 'lightblue',
        border: '1px solid black',
        cursor: 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      Draggable Div
    </div>
  );
}

export default DraggableDiv;