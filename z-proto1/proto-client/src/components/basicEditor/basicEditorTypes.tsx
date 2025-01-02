import React, {ReactNode} from "react";

export type Position = {
    x:number,
    y:number
}

export type Component = {
    id:number,
    component: HTMLElement | ReactNode,
    constructor: (position:Position) => void,
    getPosition: () => Position,
    setPosition: (position:Position) => void
}