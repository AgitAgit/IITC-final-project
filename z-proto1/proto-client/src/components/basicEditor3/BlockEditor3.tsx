import React, { useState, useContext } from 'react'
import { BasicEditorContext } from './basicEditor3'

export type BlockEditor3Props = {
    blockId: string
    blockRect: DOMRect
}

function BlockEditor3({ blockId, blockRect }: BlockEditor3Props) {
    const { baseFunctions } = useContext(BasicEditorContext);
    const [editFormVisibility, setEditFormVisibility] = useState(false);

    const editButtonsStyle = {
        position: 'absolute',
        left: blockRect.left,
        top: blockRect.top - 25
    }

    const editFormStyle = {
        position: 'absolute',
        left: 5 + blockRect.right,
        top: blockRect.y,
        zIndex: 10
    }

    function handleEditClick() {
        setEditFormVisibility(prev => !prev);
    }

    function handleDeleteClick() {
        baseFunctions.deleteObject(blockId);
    }

    return (
        <div>
            <div
                style={editButtonsStyle}>
                <button onClick={handleEditClick}>EDIT</button>
                <button onClick={handleDeleteClick}>DELETE</button>
            </div>
            {
                editFormVisibility &&
                <div
                    style={editFormStyle}>
                    <button>Content</button>
                    <button>Design</button>
                </div>
            }
        </div>
    )
}

export default BlockEditor3