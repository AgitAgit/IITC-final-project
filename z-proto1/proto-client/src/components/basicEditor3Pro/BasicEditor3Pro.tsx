import React, { useState, useRef, useEffect, ReactNode, useContext, createContext, Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { type Position } from '../basicEditor/basicEditorTypes'
import { DataObject3Content, DataObject3Style, DataObject3, RenderElement3, RenderElementNames, BasicEditorContextType, BasicEditor3Page, BasicEditor3Website } from './BasicEditor3ProTypes';

import PageNav3 from './PageNav3Pro';
import DraggableFrame3 from './DraggableFrame3Pro';
import { RedRectangle3, ColorRectangle3, TextBox3, RedTextRectangle3 } from './BasicEditor3ProComponents';
import { isEmpty, hydrateRenderElement, hydratePage, createRenderElement } from './utils';
import styles from './BasicEditor3ProStyles';
import Header3, { Header3Data } from './Header3';

//goal 0. 
// Update the data structure of BasicEditor3 to fit the new data structure:
// Website {
//    
//       Header{
//           image/logo block
//           navigation blocks
//       }
//       Page(s){
//           blocks(5 different options)
//       }
//       Footer{
//           navigation blocks
//           social blocks
//       }
//   
// }

//task DONE.
//create a basic header element that is editable, saveable, retrievable and serves to navigate the website

//task  DONE.
//create a saving and retrieving website from LS functions. 
// (the editor should only deal with one website at a time. choosing the current website and switching
//websites is an outside function...)
//subtask: DONE.
//move the hydration functions to the utils file

//task
//make the editor display components based on the current website passed to it

//task
//create functions to add/remove componenets from a website's page

//task
//create 2 different websites and toggle between them.


// goal 1. 
// Cover as 7 of the basic editor blocks functionality an unique editors if they exist.


// goal 2. 
// Imitiate the style of the squarespace editor.


// goal 3. 
// Save a few full websites and integrage with the back for saving and retrieving them.
//task
//create editor mode. the components should not be editable/moveable when not in editor mode


export type BasicEditor3ProProps = {
  currentWebsite: BasicEditor3Website
  currentPage: BasicEditor3Page
}

export const BasicEditorContext = createContext<BasicEditorContextType>({});

function BasicEditor3Pro({ currentWebsite, currentPage }: BasicEditor3ProProps) {
  const [isEditMode, setIsEditMode] = useState(true);
  const [headerEditMode, setHeaderEditMode] = useState(false);
  const pages = currentWebsite.pages;
  const renderElements = currentPage?.renderElements;

  const isRenderElements = !(renderElements.length === 0);
  const isPagesFetched = useRef(false);

  const baseFunctions = {
    deleteObject: function (id: string) {
      // setRenderElements(prev => prev.filter(element => element.data.id !== id))
    },
    setPosition: function (id: string, newPosition: Position) {
      // setRenderElements(prev => prev.map(element => element.data.id === id ? { data: { ...element.data, position: newPosition }, body: element.body } : element))
    },
    setContent: function (id: string, newContent: DataObject3Content) {
      // setRenderElements(prev => prev.map(element => element.data.id === id ? { data: { ...element.data, content: newContent }, body: element.body } : element))
    },
    setStyle: function (id: string, newStyle: DataObject3Style) {
      //I want to edit only the element with matching id
      // setRenderElements(prev => prev.map(element => element.data.id === id ? { data: { ...element.data, style: newStyle }, body: element.body } : element))
    },
    // saveChanges: savePagesToLS
  }

  function addRenderElement(renderElementName:RenderElementNames){
    const newElement = createRenderElement(renderElementName);
    currentPage.renderElements.push(newElement);
  }

  return (
    <BasicEditorContext.Provider value={{ renderElements, baseFunctions, isEditMode }}>
      <div>BasicEditor3
        <button onClick={() => { setIsEditMode(prev => !prev) }}>toggle edit mode</button>

        {isEditMode && <label style={{ border: '1px solid red' }}>edit mode on</label>}
        {/* <PageNav3 pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} saveSnapshotToPages={saveSnapshotToPages} savePagesToLS={savePagesToLS} /> */}
        <div>
          <button onClick={() => addRenderElement(RenderElementNames.red_rectangle3)}>+RedRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.red_text_rectangle3)}>+RedTextRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.color_rectangle3)}>+ColorRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.text_box3)}>+TextBox3</button>
        </div>
        <Header3 pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} headerEditMode={headerEditMode} setHeaderEditMode={setHeaderEditMode} data={headerData} setData={setHeaderData} />
        <div>
          {mapRenderElements()}
        </div>
      </div>
    </BasicEditorContext.Provider>
  )
}

export default BasicEditor3Pro