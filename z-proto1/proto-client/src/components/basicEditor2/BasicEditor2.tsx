import React, { useState } from 'react'
import { type MouseEventHandler, type MouseEvent, type ReactNode } from 'react';
import EditableText from '../basicEditor/EditableText';
import DraggableFrame from '../basicEditor/DraggableFrame';
import { Position } from '../basicEditor/basicEditorTypes';

function ButtonRandom() {
  const [num, setNum] = useState(0);
  function handleClick() {
    setNum(Math.ceil(Math.random() * 100));
  }
  return <button onClick={handleClick} style={{ width: '2rem' }}>{num}</button>
}

function RedRectangle() {
  return <div style={{
    width: '8rem',
    height: '4rem',
    backgroundColor: 'red'
  }}></div>
}

const generatorStyle = {
  width: '8rem',
  height: '4rem',
  border: '1px solid green'
}

//goal1: 
// DONE generate a menu with 3 buttons, each one generate a different component; DONE

//goal2: 
//DONE generate a page layout string that records all the objects and their positions DONE
// and data;
// save 2 pre-made pages and toggle between them;

//goal3:
//The buttons should create new elements using drag and drop mechanics;

enum genElement {
  editable_text = "editable_text",
  button_random = "button_random",
  red_rectangle = "red_rectangle"
}

type ElementDiv = {
  div: {
    id: number;
    position: {
      x: number;
      y: number;
    };
    elementName:genElement
    getSelfPosition: () => {
      x: number;
      y: number;
    };
    setSelfPosition: (position: Position) => void;
  }
  body: ReactNode;
}

type PageSnapshot = {
  page_name:string
}

function BasicEditor2() {
  const [renderElements, setRenderElements] = useState<ElementDiv[]>([])
  const isRenderElementsEmpty = renderElements.length === 0;

  function handleDeleteElement(id: number) {
    setRenderElements(prev => prev.filter(element => element.div.id !== id))
  }
  // : MouseEventHandler<HTMLDivElement>
  //add itemName attribute to the divs? instead of passing it to handleGeneratorClick to satisfy typescript?
  const handleGeneratorClick = function (e: MouseEvent<HTMLDivElement, MouseEvent>, itemName: genElement) {
    console.log("render elements:", renderElements)
    let newElement;
    const position = { x: e.clientX, y: e.clientY };//might need to add offset of window.scrollY
    const newDiv = { id: 0, position, elementName:itemName,getSelfPosition: function () { return this.position }, setSelfPosition: function (position: Position) { this.position = position } };
    if (!isRenderElementsEmpty) newDiv.id = renderElements[renderElements.length - 1].div.id + 1;
    if (itemName === genElement.editable_text) {
      newElement = { div: newDiv, body: <DraggableFrame key={newDiv.id} fillerElement={<EditableText />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
    }
    else if (itemName === genElement.button_random) {
      newElement = { div: newDiv, body: <DraggableFrame key={newDiv.id} fillerElement={<ButtonRandom />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
    }
    else if (itemName === genElement.red_rectangle) {
      newElement = { div: newDiv, body: <DraggableFrame key={newDiv.id} fillerElement={<RedRectangle />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
    }
    if (!newElement) return;
    if (isRenderElementsEmpty) setRenderElements([newElement]);
    else setRenderElements(prev => [...prev, newElement]);
  }

  const hydrateElement = function (element:ElementDiv) {
    let newElement;
    const itemName = element.div.elementName;
    // const newDiv = { id: 0, position, getSelfPosition: function () { return this.position }, setSelfPosition: function (position: Position) { this.position = position } };
    const newDiv = element.div;
    if (!isRenderElementsEmpty) newDiv.id = renderElements[renderElements.length - 1].div.id + 1;
    if (itemName === genElement.editable_text) {
      newElement = { div: newDiv, body: <DraggableFrame key={newDiv.id} fillerElement={<EditableText />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
    }
    else if (itemName === genElement.button_random) {
      newElement = { div: newDiv, body: <DraggableFrame key={newDiv.id} fillerElement={<ButtonRandom />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
    }
    else if (itemName === genElement.red_rectangle) {
      newElement = { div: newDiv, body: <DraggableFrame key={newDiv.id} fillerElement={<RedRectangle />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
    }
    if (!newElement) return;
    // if (isRenderElementsEmpty) setRenderElements([newElement]);
    // else setRenderElements(prev => [...prev, newElement]);
    return newElement;
  }

  function regenerateFromSnapshot(){
    const snapshot = localStorage.getItem("latest_snapshot");
    if(!snapshot) return;
    console.log("page snapshot:", snapshot);
    const dryElements = JSON.parse(snapshot);
    const hydratedElements = dryElements.map(element => hydrateElement(element))
    console.log("dry elements:",dryElements);
    console.log("hydrated elements:", hydratedElements)
    setRenderElements(hydratedElements);
  }

  function generatePageSnapshot(){
    const snapshot = JSON.stringify(renderElements);
    console.log("page snapshot:", snapshot);
    localStorage.setItem("latest_snapshot", snapshot);
    return snapshot;
  }

  return (

    <div>
    <button onClick={generatePageSnapshot}>create snapshot</button>
    <button onClick={regenerateFromSnapshot}>recreate snapshot</button>
      <div style={{ margin: '0', padding: '0', width: '100vw', border: '1px solid pink' }}>
        <div style={generatorStyle} onClick={(e) => handleGeneratorClick(e, genElement.editable_text)}>
          +Editable Text Element
        </div>
        <div style={generatorStyle} onClick={(e) => handleGeneratorClick(e, genElement.button_random)}>
          +Button Random Element
        </div>
        <div style={generatorStyle} onClick={(e) => handleGeneratorClick(e, genElement.red_rectangle)}>
          +Red Rectangle Element
        </div>
      </div>
      {!isRenderElementsEmpty && renderElements.map(element => element.body)}
    </div>
  )
}

export default BasicEditor2