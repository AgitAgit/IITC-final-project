import React, { useState, useContext, useRef } from 'react'
import { BasicEditorContext } from './BasicEditor3Pro'

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
    const backgroundColors = ["white", "black", "gray", "red", "green", "blue", "yellow"];
    const fixedHeights = ["1rem", "2rem", "3rem", "4rem"];

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

    function handleEditTextContent(newText: string) {
        baseFunctions.setContent(blockId, { ...element.data.content, textContent: newText });
        // baseFunctions.saveChanges();
    }

    function updateBackgroundColor(newColor: string) {
        baseFunctions.setStyle(blockId, { ...element.data.style, backgroundColor: newColor });
    }

    function updateStyle(field:string, newValue: string | number){
        const newStyle = {...element.data.style}
        newStyle[field] = newValue;
        baseFunctions.setStyle(blockId, newStyle)
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
                            <br></br>
                            <label>background color:</label>
                            <br></br>
                            <select defaultValue={element.data.style.backgroundColor} onChange={(e) => updateBackgroundColor(e.target.value)}>
                                {backgroundColors.map(color => <option key={color} value={color}>{color}</option>)}
                            </select>
                            <br></br>
                            <label>Text color:</label>
                            <br></br>
                            <select defaultValue={element.data.style.color} onChange={(e) => updateStyle("color", e.target.value)}>
                                {backgroundColors.map(color => <option key={color} value={color}>{color}</option>)}
                            </select>
                            <select onChange={(e) => updateStyle("height", e.target.value)}>
                                {fixedHeights.map(height => <option>{height}</option>)}
                            </select>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default BlockEditor3