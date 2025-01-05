import React, { type ReactNode, useState, useEffect, useRef } from 'react'

import { type DataObject3, DataObject3Content, DataObject3Style, RenderElement3, BaseFunctions } from './BasicEditor3Types'
import { Position } from '../basicEditor/basicEditorTypes'

export type DraggableFrame3Props = {
    renderElement: RenderElement3
    baseFunctions: BaseFunctions
}

function DraggableFrame3({ renderElement, baseFunctions }: DraggableFrame3Props) {
    const [position, setPosition] = useState<Position>(renderElement.data.position);
    const divRef = useRef();

    const handleMouseDown = (e) => {
        const windowYPosition = window.scrollY;
        const rect = divRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const handleMouseMove = (e) => {
            const newPosition = { x: e.clientX - offsetX, y: e.clientY - offsetY + windowYPosition }
            setPosition(newPosition);
            baseFunctions.setPosition(renderElement.data.id,newPosition)
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
            onMouseDown={handleMouseDown}
            style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            cursor: "grab",
            border: '1px solid red'//remove this later...
        }}>
            {renderElement.body}
        </div>
    )
}

export default DraggableFrame3