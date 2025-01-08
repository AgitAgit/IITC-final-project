import React, { useState, useEffect } from 'react'

import { type MouseEventHandler, type MouseEvent, type ReactNode } from 'react';
import { Position } from '../basicEditor/basicEditorTypes';
import { genElement, type ContentObject, type DataDiv, type ElementDiv} from './basicEditor2Types.ts';

import EditableText from '../basicEditor/EditableText';
import DraggableFrame from '../basicEditor/DraggableFrame';
// import DraggableFrame2 from './DraggableFrame2';
import DraggableFrame1_2 from './DraggableFrame1_2';
import EditableText2 from './EditableText2';

function ButtonRandom({ dataDiv }: { dataDiv: DataDiv }) {
  const [num, setNum] = useState(dataDiv.content.initialNum || 0);
  useEffect(() => {
    const newContent = { initialNum: num };
    dataDiv.setSelfContent(newContent);
    // dataDiv.setSelfContent({})
  }, [num])
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
//DONE and data DONE;

//These will wait for further versions:
//goal3:
// save 2 pre-made pages and toggle between them;
//The buttons should create new elements using drag and drop mechanics;




//for some reason right now recreatesnapshot does not overwrite the state of the screen.
//meaning, either it does not overwrite renderElements, or it does not overwrite localstorage.
//In regards to position seems like local storage is written and read properly.
//could It be a failure to...
//I added useEffect to DraggableFrame1_2 that sets the position to the position received in
//the props. It solved the problem.
function BasicEditor2() {
  const [renderElements, setRenderElements] = useState<ElementDiv[]>([])
  const isRenderElementsEmpty = renderElements.length === 0;

  function handleDeleteElement(id: number) {
    setRenderElements(prev => prev.filter(element => element.div.id !== id))
  }
  const getSelfPosition = function () { return this.position };
  const setSelfPosition = function (position: Position) { this.position = position }
  const setSelfContent = function (newContent: ContentObject) { this.content = newContent };
  // : MouseEventHandler<HTMLDivElement>
  //add itemName attribute to the divs? instead of passing it to handleGeneratorClick to satisfy typescript?
  const handleGeneratorClick = function (e: MouseEvent<HTMLDivElement, MouseEvent>, itemName: genElement) {
    // console.log("render elements:", renderElements)
    let newElement;
    const position = { x: e.clientX, y: e.clientY };//might need to add offset of window.scrollY
    const newDiv: DataDiv = { id: 0, position, elementName: itemName, getSelfPosition, setSelfPosition, content: {}, setSelfContent };
    if (!isRenderElementsEmpty) newDiv.id = renderElements[renderElements.length - 1].div.id + 1;
    if (itemName === genElement.editable_text) {
      newDiv.content.initialText = "default text";
      newElement = { div: newDiv, body: <DraggableFrame1_2 key={newDiv.id} fillerElement={<EditableText2 dataDiv={newDiv} />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
      // newElement = { div: newDiv, body: <DraggableFrame2 key={newDiv.id} elementDiv={{body:<EditableText2 dataDiv={newDiv} />, div:newDiv}} handleDeleteElement={handleDeleteElement} /> }
    }
    else if (itemName === genElement.button_random) {
      newElement = { div: newDiv, body: <DraggableFrame1_2 key={newDiv.id} fillerElement={<ButtonRandom dataDiv={newDiv}/>} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
      // newElement = { div: newDiv, body: <DraggableFrame2 key={newDiv.id} elementDiv={{body:<ButtonRandom dataDiv={newDiv}/>, div:newDiv}} handleDeleteElement={handleDeleteElement} /> }
    }
    else if (itemName === genElement.red_rectangle) {
      newElement = { div: newDiv, body: <DraggableFrame1_2 key={newDiv.id} fillerElement={<RedRectangle />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
      // newElement = { div: newDiv, body: <DraggableFrame2 key={newDiv.id} elementDiv={{body:<RedRectangle/>, div:newDiv}} handleDeleteElement={handleDeleteElement} /> }
    }
    if (!newElement) return;
    if (isRenderElementsEmpty) setRenderElements([newElement]);
    else setRenderElements(prev => [...prev, newElement]);
  }

  const hydrateElement = function (element: ElementDiv) {
    let newElement;
    const itemName = element.div.elementName;
    // const newDiv = { id: 0, position, getSelfPosition: function () { return this.position }, setSelfPosition: function (position: Position) { this.position = position } };
    const newDiv = element.div;
    newDiv.getSelfPosition = getSelfPosition;
    newDiv.setSelfPosition = setSelfPosition;
    newDiv.setSelfContent = setSelfContent;
    if (itemName === genElement.editable_text) {
      newElement = { div: newDiv, body: <DraggableFrame1_2 key={newDiv.id} fillerElement={<EditableText2 dataDiv={newDiv} />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
      // newElement = { div: newDiv, body: <DraggableFrame2 key={newDiv.id} elementDiv={{body:<EditableText2 dataDiv={newDiv} />, div:newDiv}} handleDeleteElement={handleDeleteElement} /> }
    }
    else if (itemName === genElement.button_random) {
      newElement = { div: newDiv, body: <DraggableFrame1_2 key={newDiv.id} fillerElement={<ButtonRandom dataDiv={newDiv}/>} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
      // newElement = { div: newDiv, body: <DraggableFrame2 key={newDiv.id} elementDiv={{body:<ButtonRandom dataDiv={newDiv} />, div:newDiv}} handleDeleteElement={handleDeleteElement} /> }
    }
    else if (itemName === genElement.red_rectangle) {
      newElement = { div: newDiv, body: <DraggableFrame1_2 key={newDiv.id} fillerElement={<RedRectangle />} div={newDiv} handleDeleteElement={handleDeleteElement} /> }
      // newElement = { div: newDiv, body: <DraggableFrame2 key={newDiv.id} elementDiv={{body:<RedRectangle/>, div:newDiv}} handleDeleteElement={handleDeleteElement} /> }
    }
    if (!newElement) return;
    // if (isRenderElementsEmpty) setRenderElements([newElement]);
    // else setRenderElements(prev => [...prev, newElement]);
    return newElement;
  }

  function regenerateFromSnapshot() {
    // setRenderElements([]);
    console.log("render elements:",renderElements)
    const snapshot = localStorage.getItem("latest_snapshot");
    if (!snapshot) return;
    // console.log("page snapshot:", snapshot);
    const dryElements = JSON.parse(snapshot);
    const hydratedElements = dryElements.map(element => hydrateElement(element))
    console.log("dry elements:", dryElements);
    console.log("hydrated elements:", hydratedElements)
    setRenderElements(hydratedElements);
  }

  function generatePageSnapshot() {
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