import React, { useState, useRef, useEffect, ReactNode, useContext, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { type Position } from '../basicEditor/basicEditorTypes'
import { DataObject3Content, DataObject3Style, DataObject3, RenderElement3, RenderElementNames, BasicEditorContextType, BasicEditor3Page, BasicEditor3Website } from './BasicEditor3ProTypes';

import PageNav3 from './PageNav3Pro';
import DraggableFrame3 from './DraggableFrame3Pro';
import { RedRectangle3, ColorRectangle3, TextBox3, RedTextRectangle3 } from './BasicEditor3ProComponents';
import { isEmpty } from './utils';
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

//task
//create a header element that is editable, saveable, retrieveable and serves to navigate the website

//task 
//create a saving and retrieving website from LS functions.
//create 2 different websites and toggle between them.


// goal 1. 
// Cover as 7 of the basic editor blocks functionality an unique editors if they exist.


// goal 2. 
// Imitiate the style of the squarespace editor.


// goal 3. 
// Save a few full websites and integrage with the back for saving and retrieving them.
//task
//create editor mode. the components should not be editable/moveable when not in editor mode


export const BasicEditorContext = createContext<BasicEditorContextType>({});

const defaultHeaderData:Header3Data = {
  logo:{ text:"LOGO1", imgSrc:null},
  pages:[],
  hasExtraButton:false,
  hasSocialLinks:false,
  hasAccount:true,
  style:{ headerStyle:{}, logoContainerStyle:{}, navContainerStyle:{}, navItemStyle:{}}
}

function BasicEditor3Pro() {
  const [isEditMode, setIsEditMode] = useState(true);
  const [headerEditMode, setHeaderEditMode] = useState(false);

  const [websites, setWebsites] = useState<BasicEditor3Website[]>([]);

  const [headerData, setHeaderData] = useState(defaultHeaderData);
  const [pages, setPages] = useState<BasicEditor3Page[]>([])
  const [renderElements, setRenderElements] = useState<RenderElement3[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const isPages = !(pages.length === 0);
  const isRenderElements = !(renderElements.length === 0);
  const isPagesFetched = useRef(false);

  useEffect(() => {//retrieve saved pages on component mount.
    retrievePagesFromLS();
  }, [])

  useEffect(() => {//displays the current page
    displayPage(currentPage);
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
    saveChanges: savePagesToLS
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

  //recreates The RenderElement's component part from it's data part.
  function hydrateRenderElement(id: string, renderElementName: RenderElementNames, position: Position = { x: 50, y: 50 }, content: DataObject3Content = {}, style: DataObject3Style = {}) {
    //hydrate start
    let body;
    if (renderElementName === RenderElementNames.red_rectangle3) {
      if (isEmpty(style)) style = styles.default_red_rectangle_style;
      body = <RedRectangle3 id={id} />
    }
    if (renderElementName === RenderElementNames.color_rectangle3) body = <ColorRectangle3 id={id} />
    if (renderElementName === RenderElementNames.text_box3) body = <TextBox3 id={id} />
    if (renderElementName === RenderElementNames.red_text_rectangle3) {
      body = <RedTextRectangle3 id={id} />
      if (isEmpty(content)) content = { textContent: 'Lorem Ipsum' }
    }
    const newRenderElement: RenderElement3 = { data: { id, renderElementName, position, content, style }, body }
    //hydrate end
    return newRenderElement;
  }

  function hydratePage(page: BasicEditor3Page) {//recreates page components from page data
    page.renderElements = page.renderElements.map(element => {
      const { id, renderElementName, position, content, style }: DataObject3 = element.data;
      return hydrateRenderElement(id, renderElementName, position, content, style)
    })
    return page;
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
    console.log('render elements from saveSnapshotToPages:', renderElements)
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

  function savePagesToLS() {
    console.log("savePagesToLS says:\nrender elements:", renderElements);
    console.log("pages:", pages);
    const pagesSnapshot = JSON.stringify(pages);
    localStorage.setItem("pages", pagesSnapshot);
  }
  function retrievePagesFromLS() {
    try {
      const retrievedPages: BasicEditor3Page[] = JSON.parse(localStorage.getItem("pages"));
      const hydratedPages = retrievedPages.map(page => hydratePage(page));
      // console.log("basicEditor3.retrievePagesFromLS says:", hydratedPages)
      setPages(hydratedPages);
      isPagesFetched.current = true;
    } catch (error) {
      console.log("basicEditor3.retrievePagesFromLS caught an error an set renderElements to []")
      setRenderElements([]);
      console.log(error);
    }
  }

  function displayPage(pageName: string) {
    const displayPageElements = pages.find(page => page.name === pageName)?.renderElements
    if (displayPageElements) {
      setRenderElements(displayPageElements);
    }
  }

  function saveWebsites() {

  }

  function retrieveWebsites() {

  }

  function displayWebsite(name: string) {

  }

  return (
    <BasicEditorContext.Provider value={{ renderElements, baseFunctions, isEditMode }}>
      <div>BasicEditor3
        {/* <button onClick={() => { retrievePagesFromLS() }}>Retrieve pages</button> */}
        <button onClick={() => { setIsEditMode(prev => !prev) }}>toggle edit mode</button>
        {isEditMode && <label style={{ border: '1px solid red' }}>edit mode on</label>}
        <PageNav3 pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} saveSnapshotToPages={saveSnapshotToPages} savePagesToLS={savePagesToLS} />
        <div>
          <button onClick={() => addRenderElement(RenderElementNames.red_rectangle3)}>+RedRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.red_text_rectangle3)}>+RedTextRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.color_rectangle3)}>+ColorRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.text_box3)}>+TextBox3</button>
        </div>
        <Header3 pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} headerEditMode={headerEditMode} setHeaderEditMode={setHeaderEditMode} data={headerData} setData={setHeaderData}/>
        <div>
          {mapRenderElements()}
        </div>
      </div>
    </BasicEditorContext.Provider>
  )
}

export default BasicEditor3Pro