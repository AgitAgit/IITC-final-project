import React from 'react'
import DraggableDiv from './DraggableDiv'
import { useRef, useState } from 'react'

//add an item
//move an item
//edit an item
//delete an item
//for now lets stick with div elements
function BasicEditor() {
    const pageRef = useRef();
    const [divs, setDivs] = useState([{x:50, y:50}]);
    function handleAddDiv(xPos=0, yPos=0){
        setDivs(prev => [...prev, {xPos, yPos}]);
    }

    return (
    <div ref={pageRef}>
        BasicEditor
        <button onClick={handleAddDiv}>Add a new div</button>
        {divs.map(div => {
            return <DraggableDiv xPos={div.x} yPos={div.y} />
        })}
    </div>
  )
}

export default BasicEditor