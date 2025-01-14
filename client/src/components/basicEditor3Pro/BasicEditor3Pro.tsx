import React, { useState, useRef, useEffect, ReactNode, useContext, createContext, Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { type Position } from '../basicEditor/basicEditorTypes'
import { DataObject3Content, DataObject3Style, DataObject3, RenderElement3, RenderElementNames, BasicEditorContextType, BasicEditor3Page, BasicEditor3Website } from './BasicEditor3ProTypes';

import PageNav3 from './PageNav3Pro';
import DraggableFrame3 from './DraggableFrame3Pro';
import { RedRectangle3, ColorRectangle3, TextBox3, RedTextRectangle3 } from './BasicEditor3ProComponents';
import { isEmpty, hydrateRenderElement, hydratePage } from './utils';
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

//task DONE.
//make the editor display components based on the current website passed to it

//task DONE.
//create 2 different websites and toggle between them.

//task DONE.
//save changes to the website header as well

//task
//change things so it can start without a default website

// goal 1. 
// Cover as 7 of the basic editor blocks functionality an unique editors if they exist.


// goal 2. 
// Imitiate the style of the squarespace editor.


// goal 3. 
// Save a few full websites and integrage with the back for saving and retrieving them.
//task
//create editor mode. the components should not be editable/moveable when not in editor mode


export type BasicEditor3ProProps = {
  // websites: BasicEditor3Website[]
  currentWebsite: BasicEditor3Website
  saveCurrentWebsite:() => void
  // setCurrentWebsite:Dispatch<SetStateAction<string>>
}

export const BasicEditorContext = createContext<BasicEditorContextType>({});

function BasicEditor3Pro({ currentWebsite, saveCurrentWebsite }: BasicEditor3ProProps) {
  const [isEditMode, setIsEditMode] = useState(true);
  const [headerEditMode, setHeaderEditMode] = useState(false);
  
  const [headerData, setHeaderData] = useState(currentWebsite.headerData);
  const [pages, setPages] = useState<BasicEditor3Page[]>(currentWebsite.pages);
  const [currentPage, setCurrentPage] = useState<string>(pages[0]?.name);
  const [renderElements, setRenderElements] = useState<RenderElement3[]>([]);

  const isPages = !(pages.length === 0);
  const isRenderElements = !(renderElements.length === 0);
  const isPagesFetched = useRef(false);
  
  
  useEffect(() => {
    setPages(currentWebsite.pages);
    if(currentWebsite.pages[0]){
      setCurrentPage(currentWebsite.pages[0].name)
    }
    setHeaderData(currentWebsite.headerData);
    // console.log("basic editor says header data:",headerData)
    // console.log("current website:",currentWebsite.name);
    // console.log("current website header data:",currentWebsite.headerData);
  }, [currentWebsite])
  
  useEffect(() => {
    currentWebsite.headerData = headerData;
    // console.log("current website:",currentWebsite.name);
    // console.log("current website header data:",currentWebsite.headerData);
  },[headerData])

  useEffect(() => {//displays the current page
    displayPage(currentPage);
    currentWebsite.pages = pages;
  }, [currentPage, pages])

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
    },
    saveChanges: saveCurrentWebsite
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

  function mapRenderElements(): ReactNode[] {
    return isRenderElements ?
      renderElements.map(element =>
        <DraggableFrame3 key={element.data.id} renderElement={element} baseFunctions={baseFunctions} />
      )
      : []
  }

  function saveSnapshotToPages(pageName: string, pageElements?: RenderElement3[]) {
    const newPage = { name: pageName, renderElements }
    // console.log('render elements from saveSnapshotToPages:', renderElements)
    if (pageElements) newPage.renderElements = pageElements;
    if (isPages) {
      const pageIndex = pages.findIndex(page => page.name === pageName);
      if (pageIndex === -1) {
        setPages(prev => [...prev, newPage])
      }
      else {
        const newPages = [...pages];
        newPages[pageIndex].renderElements = renderElements;
        // setPages(newPages);
      }
    }
    else {
      setPages([newPage])
    }
  }

  function saveChangesToWebsite(){
    console.log("current website:",currentWebsite.name);
    console.log("current website header data:",currentWebsite.headerData);
    saveSnapshotToPages(currentPage, renderElements);
    saveCurrentWebsite();
  }

  function displayPage(pageName: string) {
    // console.log("displayPage says current website is:", currentWebsite.name);
    // console.log("current page is:", currentPage);
    const displayPageElements = pages.find(page => page.name === pageName)?.renderElements
    if (displayPageElements) {
      setRenderElements(displayPageElements);
    }
  }

  // function saveHeaderToLS() {
  //   localStorage.setItem("headerData", JSON.stringify(headerData));
  // }

  // function retrieveHeaderFromLS() {
  //   try {
  //     const headerDataString = localStorage.getItem("headerData");
  //     if (headerDataString) setHeaderData(JSON.parse(headerDataString));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function saveWebsites() {

  }

  function retrieveWebsites() {

  }

  function displayWebsite(name: string) {
    
  }

  return (
    <BasicEditorContext.Provider value={{ renderElements, baseFunctions, isEditMode }}>
      <div>BasicEditor3
        <button onClick={saveChangesToWebsite}>save changes from Basic editor</button>
        {/* <button onClick={() => { retrievePagesFromLS() }}>Retrieve pages</button> */}
        <button onClick={() => { setIsEditMode(prev => !prev) }}>toggle edit mode</button>
        {/* <button onClick={saveHeaderToLS}>save header data</button> */}
        {/* <button onClick={retrieveHeaderFromLS}>retrieve header data</button> */}

        {isEditMode && <label style={{ border: '1px solid red' }}>edit mode on</label>}
        <PageNav3 pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} saveSnapshotToPages={saveSnapshotToPages} savePagesToLS={saveCurrentWebsite} />
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