import { ReactNode } from "react";
import { Position } from "../basicEditor/basicEditorTypes";

export type DataObject3Content = {
    [key:string]:any;
}

export type DataObject3Style = {
    [key:string]:any;
}

export type DataObject3 = {
    id:string;
    position: Position;
    content: DataObject3Content;
    style: DataObject3Style;
}

export type RenderElement3 = {
    data:DataObject3
    body: ReactNode
}


export type BaseFunctions = {
    deleteObject: (id:string) => void;
    setPosition: (id:string, newPosition:Position) => void;
    setContent: (id:string, newContent:DataObject3Content) => void;
    setStyle: (id:string, newStyle:DataObject3Style) => void;        
}