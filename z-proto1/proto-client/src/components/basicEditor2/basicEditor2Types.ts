import { type ReactNode } from "react";
import { type Position } from "../basicEditor/basicEditorTypes";

export enum genElement {
    editable_text = "editable_text",
    button_random = "button_random",
    red_rectangle = "red_rectangle"
}

export type ContentObject = {
    [key: string]: any;
}

export type DataDiv = {
    id: number;
    position: {
        x: number;
        y: number;
    };
    elementName: genElement
    getSelfPosition: () => {
        x: number;
        y: number;
    };
    setSelfPosition: (position: Position) => void;
    content: ContentObject;
    setSelfContent: (newContent: ContentObject) => void;
}

export type ElementDiv = {
    div: DataDiv
    body: ReactNode;
}
