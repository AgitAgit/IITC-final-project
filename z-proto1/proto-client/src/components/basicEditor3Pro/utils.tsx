import styles from './BasicEditor3ProStyles';
import { Position } from '../basicEditor/basicEditorTypes';
import { RenderElementNames, DataObject3, RenderElement3, BasicEditor3Page, BasicEditor3Website } from './BasicEditor3ProTypes'
import { RedRectangle3, ColorRectangle3, TextBox3, RedTextRectangle3} from './BasicEditor3ProComponents';

export function isEmpty(obj: { [key: string]: any }) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

//recreates The RenderElement's component part from it's data part.
export function hydrateRenderElement(id: string, renderElementName: RenderElementNames, position: Position = { x: 50, y: 50 }, content: DataObject3Content = {}, style: DataObject3Style = {}) {
    //hydrate start
    let body;
    if (renderElementName === RenderElementNames.red_rectangle3) {
        if (isEmpty(style)) style = styles.default_red_rectangle_style;
        body = <RedRectangle3 id={ id } />
    }
    if (renderElementName === RenderElementNames.color_rectangle3) body = <ColorRectangle3 id={ id } />
    if (renderElementName === RenderElementNames.text_box3) body = <TextBox3 id={ id } />
    if (renderElementName === RenderElementNames.red_text_rectangle3) {
        body = <RedTextRectangle3 id={ id } />
        if (isEmpty(content)) content = { textContent: 'Lorem Ipsum' }
    }
    const newRenderElement: RenderElement3 = { data: { id, renderElementName, position, content, style }, body }
    //hydrate end
    return newRenderElement;
}

export function hydratePage(page: BasicEditor3Page) {//recreates page components from page data
    page.renderElements = page.renderElements.map(element => {
        const { id, renderElementName, position, content, style }: DataObject3 = element.data;
        return hydrateRenderElement(id, renderElementName, position, content, style)
    })
    return page;
}

export function hydrateWebsite(website: BasicEditor3Website){
    website.pages = website.pages.map(page => hydratePage(page));
    // return website;//is it passed by value or by reference? maybe I can just edit without returning.
    //pretty sure an object is passed by reference.
}

export function hydrateWebsites(websites: BasicEditor3Website[]){
    websites.forEach(website => hydrateWebsite(website));
}









  // function savePagesToLS() {
  //   console.log("savePagesToLS says:\nrender elements:", renderElements);
  //   console.log("pages:", pages);
  //   const pagesSnapshot = JSON.stringify(pages);
  //   localStorage.setItem("pages", pagesSnapshot);
  // }
  // function retrievePagesFromLS() {
  //   try {
  //     const retrievedPages: BasicEditor3Page[] = JSON.parse(localStorage.getItem("pages"));
  //     const hydratedPages = retrievedPages.map(page => hydratePage(page));
  //     // console.log("basicEditor3.retrievePagesFromLS says:", hydratedPages)
  //     setPages(hydratedPages);
  //     isPagesFetched.current = true;
  //   } catch (error) {
  //     console.log("basicEditor3.retrievePagesFromLS caught an error an set renderElements to []")
  //     setRenderElements([]);
  //     console.log(error);
  //   }
  // }