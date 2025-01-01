import React, { useRef, useState } from 'react';

function DraggableDiv({ xPos = 0, yPos = 0}) {
  const [position, setPosition] = useState({ x: xPos, y: yPos });
  const divRef = useRef(null);

  const handleMouseDown = (e) => {
    const windowYPosition = window.scrollY;
    const rect = divRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY + windowYPosition,
        // x: e.clientX,
        // y: e.clientY
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