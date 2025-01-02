import React, {useState} from 'react'

import EditableText from '../basicEditor/EditableText';
import DraggableFrame from '../basicEditor/DraggableFrame';

function ButtonRandom(){
  const [num, setNum] = useState(0);
  function handleClick(){
      setNum(Math.ceil(Math.random() * 100));
  }
  return <button onClick={handleClick}>{num}</button>
}

const generatorStyle = {
  width:'8rem',
  height:'4rem',
  border:'1px solid green'
}

//goal1: 
// generate a menu with 3 buttons, each one generate a different component;
//The buttons should create new elements using drag and drop mechanics;

//goal2: 
// generate a page layout object that records all the objects and their positions and data;
// save 2 pre-made pages and toggle between them;

enum genElement {
  editable_text = "editable_text",
  button_random = "button_random",
  red_rectangle = "red_rectangle"
}

function BasicEditor2() {
  const [renderElements, setRenderElements] = useState([])

  function handleGeneratorMouseDown(e:MouseEvent, itemName:string){
    let newElement;
    if(itemName === 'editable-text'){
      // newElement = 
    }
    if(!newElement) return;
    if(renderElements.length === 0) setRenderElements([newElement]);
    else setRenderElements(prev => [...prev, newElement]);
  }

  return (
    <div style={{margin:'0', padding:'0', width:'100vw',border:'1px solid pink'}}>
      <div style={generatorStyle} onMouseDown={(e) => handleGeneratorMouseDown(e, genElement.editable_text)}>
        +Editable Text Element
      </div>
      <div style={generatorStyle}>
        +Button Random Element
      </div>
      <div style={generatorStyle}>
        +Red Rectangle Element
      </div>
    </div>
  )
}

export default BasicEditor2