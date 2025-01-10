import { ReactNode, ComponentType } from "react";
import { Position } from "../basicEditor/basicEditorTypes";

export type BasicEditor3User = {
    
}

export type DataObject3Content = {
    [key: string]: any;
}

export type DataObject3Style = {
    [key: string]: any;
}

export type DataObject3 = {
    id: string;
    renderElementName:RenderElementNames;
    position: Position;
    content: DataObject3Content;
    style: DataObject3Style;
}

export type RenderElement3 = {
    data: DataObject3
    body: ReactNode
}

export type BasicEditor3Page = {
    name: string
    renderElements: RenderElement3[]
}

export type BasicEditor3Header = {
    renderElements:RenderElement3[]
}

export type BasicEditor3Footer = {
    renderElements:RenderElement3[]
}

export type BasicEditor3Website = {
    owner:BasicEditor3User
    header:BasicEditor3Header
    pages:BasicEditor3Page[]
    footer:BasicEditor3Footer
}

export type BaseFunctions = {
    deleteObject: (id: string) => void;
    setPosition: (id: string, newPosition: Position) => void;
    setContent: (id: string, newContent: DataObject3Content) => void;
    setStyle: (id: string, newStyle: DataObject3Style) => void;
    saveChanges: () => void;
}

export enum RenderElementNames {
    red_rectangle3 = "red_rectangle3",
    red_text_rectangle3 = "red_text_rectangle3",
    text_box3 = "text_box3",
    color_button = "color_button",
    color_rectangle3 = "color_rectangle3"
}

export type BasicEditorContextType = {
    renderElements: RenderElement3[];
    baseFunctions: BaseFunctions;
}