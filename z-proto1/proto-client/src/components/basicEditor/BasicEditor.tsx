import React from 'react'
import { useRef, useState } from 'react'

import { type Position, type Component  } from './basicEditorTypes'

import DraggableDiv from './DraggableDiv'
import DraggableFrame from './DraggableFrame'
import EditableText from './EditableText'

//add an item DONE
//move an item DONE
//edit an item DONE
//delete an item DONE
//for now lets stick with div elements
function BasicEditor() {
    const pageRef = useRef();
    const [divs, setDivs] = useState([]);
    
    function handleAddDiv(divPosition = {x:0, y:0}){
        console.log("divs:", divs);
        console.log("divs[divs.length - 1]", divs[divs.length - 1]);
        console.log("divs[divs.length - 1].id", divs[divs.length - 1]?.id);
        const newId = divs[divs.length - 1]?.id + 1 || 0;
        if(divs.length === 0) setDivs([{id:newId, position:divPosition, getSelfPosition:function(){return this.position}, setSelfPosition:function(position){this.position = position}}]);
        else setDivs(prev => [...prev, {id:newId, position:divPosition, getSelfPosition:function(){return this.position}, setSelfPosition:function(position){this.position = position}}]);
    }

    // function handleAddElement(divPosition = {x:0, y:0}, baseComponent = 'ButtonRandom'){
    //     return [ <ButtonRandom />, <ButtonRandom />, <ButtonRandom />]
    // }

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
        {divs.length > 0 && divs.map(div => {
            return <DraggableFrame key={div.id} fillerElement={<EditableText />} div={div} handleDeleteElement={handleDeleteElement} />
        })}
    </div>
  )
}

export default BasicEditor