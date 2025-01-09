import React, { useState, useRef, useEffect, ReactNode, useContext, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { type Position } from '../basicEditor/basicEditorTypes'
import { DataObject3Content, DataObject3Style, DataObject3, RenderElement3, RenderElementNames, BasicEditorContextType, BasicEditor3Page } from './BasicEditor3Types';

import PageNav3 from './PageNav3';
import DraggableFrame3 from './DraggableFrame3';
import { RedRectangle3, ColorRectangle3, TextBox3, RedTextRectangle3 } from './BasicEditor3Components';
import { isEmpty } from './utils';
import styles from './BasicEditor3Styles';

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

//goal 5 DONE
//save named pages, display a list of them and retrieve them to the screen
//task: DONE
// create a component displaying a form that allows entering new page names, 
// displays the list of existing pages, allows switching between pages and saving changes to the 
// current page

//goal 6 DONE
//pages should persist, and available pages should be remembered.
//Task DONE
//Create functions to save and retrieve pages with LS
//Task DONE
//Convert PageNav3 so it works with the new configuration.

//when I refresh, the app is not updated properly. The data from local storage is
//retrieved with useEffect but isn't rendered.
//when I save the code and so vite reruns the app it does refresh properly and retrieve
//everything it's supposed to. What is going on? LAST HERE

//Pages are retrieved successfully and printed by retrievePagesFromLS
//useEffect2 prints that the pages are empty?
//could displayPage be causing some problems?

//goal
//add some more advanced editing tools, look at squarespace
//For now, I will focus on adding the block editing menu and functionalities.
//task DONE
//Add ability to edit text content in relevant blocks
//task DONE
//Add ability to choose background color
//task DONE
//Add ability to choose text color;

//goal
//integrate with the back to save and retrieve some pages.



//general work
//task DONE
//clear the color switching from draggableframe3 and add it to colorRectangle3

//task DONE
//add types to the context object


export const BasicEditorContext = createContext<BasicEditorContextType>({});

function BasicEditor3() {
  const [pages, setPages] = useState<BasicEditor3Page[]>([])
  const [renderElements, setRenderElements] = useState<RenderElement3[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const isPages = !(pages.length === 0);
  const isRenderElements = !(renderElements.length === 0);
  const isPagesFetched = useRef(false);
  
  useEffect(() => {//retrieve saved pages on component mount.
    retrievePagesFromLS();
  },[])

  useEffect(() => {//displays the current page
    displayPage(currentPage);
  },[currentPage, pages])
  
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
      if(isEmpty(style)) style=styles.default_red_rectangle_style;
      body = <RedRectangle3 id={id}/>
    }
    if (renderElementName === RenderElementNames.color_rectangle3) body = <ColorRectangle3 id={id} />
    if (renderElementName === RenderElementNames.text_box3) body = <TextBox3 id={id} />
    if (renderElementName === RenderElementNames.red_text_rectangle3) {
      body = <RedTextRectangle3 id={id}/>
      if(isEmpty(content)) content={ textContent:'Lorem Ipsum'}
    }
    const newRenderElement: RenderElement3 = { data: { id, renderElementName, position, content, style }, body }
    //hydrate end
    return newRenderElement;
  }

  function hydratePage(page:BasicEditor3Page){//recreates page components from page data
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

  function saveSnapshotToPages(pageName: string, pageElements?:RenderElement3[]) {
    const newPage = {name:pageName, renderElements}
    console.log('render elements from saveSnapshotToPages:', renderElements)
    if(pageElements) newPage.renderElements = pageElements;
    if(isPages){
      const pageIndex = pages.findIndex(page => page.name === pageName);
      if(pageIndex === -1){
        setPages(prev => [...prev, newPage])
      }
      else{
        const newPages = [...pages];
        newPages[pageIndex].renderElements = renderElements;
        // setPages(newPages);
        //why is this working properly without the setPages? Probably related to shallow copy behaviour.

        // setPages(prev => [...prev.filter(page => page.name !== newPage.name), newPage]);
        //when I use this line to save, it saves the former state, and requires two click to save properly.
        //thats probably because the local save and ls save are run one after another in PageNav3
        //and setPages does not have effect yet when save to ls is run, but in the former lines,
        //due to shallow copy behaviour the pages are edited directly and not assigned by setPages
      }
    } 
    else {
      setPages([newPage])
    }
  }

  function savePagesToLS(){
    console.log("savePagesToLS says:\nrender elements:", renderElements);
    console.log("pages:",pages);
    const pagesSnapshot = JSON.stringify(pages);
    localStorage.setItem("pages", pagesSnapshot);
  }
  function retrievePagesFromLS(){
    try {
      const retrievedPages:BasicEditor3Page[] = JSON.parse(localStorage.getItem("pages"));
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

  function displayPage(pageName:string){
    const displayPageElements = pages.find(page => page.name === pageName)?.renderElements
    if(displayPageElements){
      setRenderElements(displayPageElements);
    }
  }

  return (
    <BasicEditorContext.Provider value={{ renderElements, baseFunctions }}>
      <div>BasicEditor3
        <button onClick={() => {retrievePagesFromLS()}}>Retrieve pages</button>
        <PageNav3 pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} saveSnapshotToPages={saveSnapshotToPages} savePagesToLS={savePagesToLS}/>
        <div>
          <button onClick={() => addRenderElement(RenderElementNames.red_rectangle3)}>+RedRectangle3</button>
          <button onClick={() => addRenderElement(RenderElementNames.red_text_rectangle3)}>+RedTextRectangle3</button>
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