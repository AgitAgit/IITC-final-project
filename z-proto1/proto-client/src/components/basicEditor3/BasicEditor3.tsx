import React, { useState, useRef, useEffect, ReactNode, useContext, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { type Position } from '../basicEditor/basicEditorTypes'
import { DataObject3Content, DataObject3Style, DataObject3, RenderElement3, RenderElementNames, BasicEditorContextType } from './BasicEditor3Types';

import PageNav3 from './PageNav3';
import DraggableFrame3 from './DraggableFrame3';
import { RedRectangle3, ColorRectangle3, TextBox3 } from './BasicEditor3Components';

enum slots {
  slot1 = "slot1",
  slot2 = "slot2"
}

//goal1 
//1.1 Retain abilities of basic editor2:DONE
//  DONE-menu with 3 components, draggable, editable, deletable, storable, retrievable.DONE
//1.2 Simplify the code:
// DONE-make a dataObject without functions that is used to record the state of the component.
//   it should store position and content.
//?
// -each component should export a type that extends the dataObject3 to specify how dataObject3.content object should look

//goal2 DONE
//save 2 pre-made pages and toggle between them

//goal3 DONE
//add a style property to dataObject3 and some way to dynamically change some aspect of the components css such as background color.
//should I add some editor interface to draggableFrame? it could update the style with
//the baseFunctions.setStyle it gets.

//goal4 DONE
//edit the content of some element(for example, TextBox3)

//goal 5 
//save named pages, display a list of them and retrieve them to the screen
//task: 
// create a component displaying a form that allows entering new page names, 
// displays the list of existing pages, allows switching between pages and saving changes to the 
// current page


//goal
//integrate with the back to save and retrieve some pages.

//goal
//add some more advanced editing tools, look at squarespace


//general work
//task DONE
//clear the color switching from draggableframe3 and add it to colorRectangle3

//task DONE
//add types to the context object


export const BasicEditorContext = createContext<BasicEditorContextType>({});

//should I try to pass each components data through useContext?
function BasicEditor3() {
  // const testRenderElement: RenderElement3 = { data: { id: 'test', renderElementName: RenderElementNames.red_square, position: { x: 0, y: 0 }, content: {}, style: {} }, body: <div>test test test</div> };
  // const [pages, setPages] = useState
  const [renderElements, setRenderElements] = useState<RenderElement3[]>([]);
  const isRenderElements = !(renderElements.length === 0);

  const baseFunctions = {
    deleteObject: function (id: string) {
      setRenderElements(prev => prev.filter(element => element.data.id !== id))
    },
    setPosition: function (id: string, newPosition: Position) {
      setRenderElements(prev => prev.map(element => element.data.id === id ? { data: { ...element.data, position: newPosition }, body: element.body } : element))
    },
    setContent: function (id: string, newContent: DataObject3Content) {
      setRenderElements(prev => prev.map(element => element.data.id === id ? { data: { ...element.data, content: newContent }, body: element.body } : element))
    },
    setStyle: function (id: string, newStyle: DataObject3Style) {
      //I want to edit only the element with matching id
      setRenderElements(prev => prev.map(element => element.data.id === id ? { data: { ...element.data, style: newStyle }, body: element.body } : element))
    }
  }

  function addRenderElement(renderElementName: RenderElementNames, position: Position = { x: 50, y: 50 }, content: DataObject3Content = {}, style: DataObject3Style = {}) {
    try {
      const id = uuidv4();
      const newRenderElement = hydrateRenderElement(id, renderElementName, position, content, style);
      if (isRenderElements) setRenderElements(prev => [...prev, newRenderElement]);
      else setRenderElements([newRenderElement]);
    } catch (error) {
      console.log(error);
    }
  }

  function hydrateRenderElement(id: string, renderElementName: RenderElementNames, position: Position = { x: 50, y: 50 }, content: DataObject3Content = {}, style: DataObject3Style = {}) {
    //hydrate start
    let body;
    if (renderElementName === RenderElementNames.red_rectangle3) body = <RedRectangle3 />
    if (renderElementName === RenderElementNames.color_rectangle3) body = <ColorRectangle3 id={id} />
    if(renderElementName === RenderElementNames.text_box3) body = <TextBox3 id={id} />
    const newRenderElement: RenderElement3 = { data: { id, renderElementName, position, content, style }, body }
    //hydrate end
    return newRenderElement;
  }

  function mapRenderElements(): ReactNode[] {
    return isRenderElements ?
      renderElements.map(element =>
        <DraggableFrame3 key={element.data.id} renderElement={element} baseFunctions={baseFunctions} />
      )
      : []
  }

  function saveSnapshotToLS(slot:slots) {
    const snapshot = JSON.stringify(renderElements);
    localStorage.setItem(slot, snapshot);
  }

  function retrieveSnapshotFromLS(slot:slots) {
    try {
      const snapshot: RenderElement3[] = JSON.parse(localStorage.getItem(slot));
      const hydratedRenderElements = snapshot.map(element => {
        const { id, renderElementName, position, content, style }: DataObject3 = element.data;
        return hydrateRenderElement(id, renderElementName, position, content, style)
      })
      setRenderElements(hydratedRenderElements);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BasicEditorContext.Provider value={{ renderElements, baseFunctions }}>
      <div>BasicEditor3
        <PageNav3 />
        <div>
          <button onClick={() => saveSnapshotToLS(slots.slot1)}>save snapshot to slot1</button>
          <button onClick={() => retrieveSnapshotFromLS(slots.slot1)}>retrieve snapshot from slot1</button>
        </div>
        <div>
          <button onClick={() => saveSnapshotToLS(slots.slot2)}>save snapshot to slot2</button>
          <button onClick={() => retrieveSnapshotFromLS(slots.slot2)}>retrieve snapshot from slot2</button>
        </div>
        <div>
          <button onClick={() => addRenderElement(RenderElementNames.red_rectangle3)}>+RedRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.color_rectangle3)}>+ColorRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.text_box3)}>+TextBox3</button>
        </div>
        <div>
          {mapRenderElements()}
        </div>
      </div>
    </BasicEditorContext.Provider>
  )
}

export default BasicEditor3