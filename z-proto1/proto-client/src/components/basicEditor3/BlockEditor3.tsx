import React, { useState, useContext, useRef } from 'react'
import { BasicEditorContext } from './basicEditor3'

export type BlockEditor3Props = {
    blockId: string
    blockRect: DOMRect
}

function BlockEditor3({ blockId, blockRect }: BlockEditor3Props) {
    const { renderElements, baseFunctions } = useContext(BasicEditorContext)
    const element = renderElements.filter(element => element.data.id === blockId)[0]
    const [editFormVisibility, setEditFormVisibility] = useState(false);
    const [contentMode, setContentMode] = useState(true);
    const textContentInputRef = useRef();

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

    function handleEditTextContent(newText:string){
        baseFunctions.setContent(blockId, {...element.data.content, textContent:newText});
        // baseFunctions.saveChanges();
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
                    <button onClick={() => setContentMode(true)}>Content</button>
                    <button onClick={() => setContentMode(false)}>Design</button>
                    {
                        contentMode &&
                        <div>
                            Content edit div
                            {
                                element.data.content.textContent &&
                                <div>
                                    <label>Text Content:</label>
                                    <br></br>
                                    <input 
                                    defaultValue={element.data.content.textContent}
                                    ref={textContentInputRef}
                                    ></input>
                                    <button onClick={() => handleEditTextContent(textContentInputRef.current.value)}>Edit</button>
                                </div>
                            }
                        </div>
                    }
                    {
                        !contentMode && <div>
                            Design edit div
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default BlockEditor3