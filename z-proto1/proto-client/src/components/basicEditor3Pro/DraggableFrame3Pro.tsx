import React, { type ReactNode, useState, useEffect, useRef, useContext } from 'react'

import { type DataObject3, DataObject3Content, DataObject3Style, RenderElement3, BaseFunctions, RenderElementNames } from './BasicEditor3ProTypes'
import { Position } from '../basicEditor/basicEditorTypes'
import BlockEditor3 from './BlockEditor3Pro';
import { BasicEditorContext } from './BasicEditor3Pro';

// interface Props {
//   element: React.ComponentType<any>; // Type for the dynamic component
//   propsForElement: any; // Type for the props to be passed
// }

// const DynamicComponent: React.FC<Props> = ({ element, propsForElement }) => {
//   return (
//     <>
//       {React.createElement(element, propsForElement)} 
//     </>
//   );
// };

export type DraggableFrame3Props = {
    renderElement: RenderElement3
}

function DraggableFrame3({ renderElement }: DraggableFrame3Props) {
    const [position, setPosition] = useState<Position>(renderElement.data.position);
    const [displayEditButtons, setDisplayEditButtons] = useState(false);
    const { baseFunctions } = useContext(BasicEditorContext)
    const divRef = useRef();

    useEffect(() => {
        setPosition(renderElement.data.position)
    }, [renderElement.data.position])

    const handleMouseDown = (e) => {
        const windowYPosition = window.scrollY;
        const rect = divRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const handleMouseMove = (e) => {
            const newPosition = { x: e.clientX - offsetX, y: e.clientY - offsetY + windowYPosition }
            setPosition(newPosition);
            baseFunctions.setPosition(renderElement.data.id, newPosition)
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    function handleDelete() {
        baseFunctions.deleteObject(renderElement.data.id);
    }

    function toggleDisplayEditButtons() {
        setDisplayEditButtons(prev => !prev);
    }

    return (
        <>
            {
                displayEditButtons && divRef.current &&
                <BlockEditor3 blockId={renderElement.data.id} blockRect={divRef.current.getBoundingClientRect()} />
            }
            <div
                ref={divRef}
                onMouseDown={handleMouseDown}
                onClick={toggleDisplayEditButtons}
                style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    cursor: "grab",
                    border: '1px solid red'//remove this later...
                }}>
                {renderElement.body}
                {/* <DynamicComponent element={renderElement.body} propsForElement={{}}/> */}
            </div>
        </>
    )
}

export default DraggableFrame3