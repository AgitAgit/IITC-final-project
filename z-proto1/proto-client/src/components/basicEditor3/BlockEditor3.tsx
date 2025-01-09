import React, { useState } from 'react'

function BlockEditor3() {
    const [editButtonsDisplay, setEditButtonsDisplay] = useState('none')

    const editButtonsStyle = {
        display: editButtonsDisplay,
        position: 'absolute',
        left: position.x,
        top: position.y - 25
    }

    function toggleDisplayEditButtons() {
        console.log(editButtonsDisplay)
        if (editButtonsDisplay === 'none') {
            setEditButtonsDisplay('block');
        }
        else {
            setEditButtonsDisplay('none');
        }
    }


    return (
        <div>
            <div
                style={editButtonsStyle}>
                <button onClick={handleEditClick}>EDIT</button>
                <button onClick={handleDelete}>DELETE</button>
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: 5 + divRef.current.getBoundingClientRect().right,
                    top: position.y,
                    zIndex: 10
                    // backgroundColor:'white'
                }}>
                <button>Content</button>
                <button>Design</button>
            </div>
        </div>
    )
}

export default BlockEditor3