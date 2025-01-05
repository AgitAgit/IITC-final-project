import React, {useState, useRef, useEffect, ReactNode} from 'react'
import { v4 as uuidv4 } from 'uuid';

import { type Position } from '../basicEditor/basicEditorTypes'
import { DataObject3Content, DataObject3Style, DataObject3, RenderElement3 } from './BasicEditor3Types';



//goal1 
//1.1 Retain abilities of basic editor2:
//  -menu with 3 components, draggable, editable, deletable, storable, retrievable.
//1.2 Simplify the code:
// -make a dataObject without functions that is used to record the state of the component.
//   it should store position and content.
// (for BE4?)-make a base class that holds the draggability functionality of the editorObject.
// -each component should export a type that extends the dataObject3 to specify how dataObject3.content object should look

//goal2
//save 2 pre-made pages and toggle between them

//goal3
//add a style property to dataObject3 and some way to dynamically change some aspect of the components css such as background color.

//goal4
//integrate with the back to save and retrieve some pages.


function BasicEditor3() {
    const [renderElements, setRenderElements] = useState<RenderElement3[]>([]);
    
    const baseFunctions = {
        deleteObject: function(id:string){},
        setPosition: function(id:string, newPosition:Position){},
        setContent: function(id:string, newContent:DataObject3Content){},
        setStyle: function(id:string, newStyle:DataObject3Style){}
    }

    function addRenderElement(){
        const id = uuidv4();
    }

  return (
    <div>BasicEditor3</div>
  )
}

export default BasicEditor3