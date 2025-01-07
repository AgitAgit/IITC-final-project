import { useContext } from "react"
import { BasicEditorContext } from "./basicEditor3"
import { DataObject3Content, DataObject3Style } from "./BasicEditor3Types"

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function RedRectangle3() {
    return <div style={{
        width: '8rem',
        height: '4rem',
        backgroundColor: 'red'
    }}
    >RedRectangle3</div>
}

export function ColorRectangle3({ id }) {
    const { renderElements } = useContext(BasicEditorContext)
    const element = renderElements.filter(element => element.data.id === id)[0]
    const defaultStyle = { width: '8rem', height: '4rem', backgroundColor: 'purple' };
    const style = element.data.style;

    const finalStyle = isEmpty(style) ? defaultStyle : style;
    return <div style={finalStyle}>
        ColorRectangle3
    </div>
}

export function TextBox({ content, style }: { content: DataObject3Content, style: DataObject3Style }) {

}
