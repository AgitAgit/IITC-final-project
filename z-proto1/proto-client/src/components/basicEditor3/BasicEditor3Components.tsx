import { DataObject3Style } from "./BasicEditor3Types"

export function RedRectangle3(){
    return <div style={{
        width:'8rem',
        height:'4rem',
        backgroundColor:'red'
    }}
    >RedRectangle3</div>
}

export function ColorRectangle3({style}:{style:DataObject3Style}){
    return <div style={style}>
        ColorRectangle3
    </div>
}