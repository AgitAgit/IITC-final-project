import React, { ReactNode, useRef, useState } from 'react';
import { Position } from '../basicEditor/basicEditorTypes';

export type DraggableFrame2Props = {
  fillerElement: {
    id: number,
    element: HTMLElement | ReactNode
  },
  initialPosition: Position
  handleDeleteElement: () => void
}

function DraggableFrame2({ fillerElement, initialPosition, handleDeleteElement }: DraggableFrame2Props) {
  const [position, setPosition] = useState({ x: initialPosition.x, y: initialPosition.y });
  const divRef = useRef(null);

  function handleChangePosition(newPosition:Position){
    setPosition(newPosition);
    div.setSelfPosition(newPosition);

  }

  const handleMouseDown = (e) => {
    const windowYPosition = window.scrollY;
    const rect = divRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX - offsetX, y: e.clientY - offsetY + windowYPosition }
      handleChangePosition(newPosition);
    };

    const handleMouseUp = () => {
      console.log("div.getSelfPosition", div.getSelfPosition());
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  function handleFrameClick() {
    console.log("div", div);
  }

  return (
    <div
      ref={divRef}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        cursor: 'grab',
        border: '1px solid black'
      }}
      onMouseDown={handleMouseDown}
      onClick={handleFrameClick}
    >
      <button onClick={() => handleDeleteElement(div.id)}>Delete</button>
      DraggableFrame2
      {fillerElement}
    </div>
  )
}

export default DraggableFrame2