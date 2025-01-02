import React from 'react'
import { useRef, useState } from 'react'

import DraggableDiv from './DraggableDiv'
import DraggableFrame from './DraggableFrame'

//add an item DONE
//move an item DONE
//edit an item
//delete an item DONE
//for now lets stick with div elements
function BasicEditor() {
    const pageRef = useRef();
    const [divs, setDivs] = useState([{id:0, position: {x:50, y:50}, getSelfPosition:function(){return this.position}, setSelfPosition:function(newPosition){this.position = newPosition} }]);
    
    function handleAddDiv(divPosition = {x:0, y:0}){
        console.log("divs:", divs);
        console.log("divs[divs.length - 1]", divs[divs.length - 1]);
        console.log("divs[divs.length - 1].id", divs[divs.length - 1].id);
        const newId = divs[divs.length - 1].id + 1;
        setDivs(prev => [...prev, {id:newId, position:divPosition, getSelfPosition:function(){return this.position}, setSelfPosition:function(position){this.position = position}}]);
    }
    
    function handleDeleteElement(id:number){
        setDivs(prev => prev.filter(element => element.id !== id));
    }

    const item = <p>baba3000</p>;
    return (
    <div ref={pageRef} style={{height: '2000px'}}>
        BasicEditor
        {item}
        <button onClick={handleAddDiv}>Add a new div</button>
        {/* {divs.map(div => {
            return <DraggableDiv xPos={div.x} yPos={div.y} />
        })} */}
        {divs.map(div => {
            return <DraggableFrame key={div.id} fillerElement={item} div={div} handleDeleteElement={handleDeleteElement} />
        })}
    </div>
  )
}

export default BasicEditor