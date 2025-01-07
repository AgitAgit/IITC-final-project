import { useContext } from "react"
import { BasicEditorContext } from "./basicEditor3"
import { DataObject3Content, DataObject3Style } from "./BasicEditor3Types"

export function RedRectangle3() {
    return <div style={{
        width: '8rem',
        height: '4rem',
        backgroundColor: 'red'
    }}
    >RedRectangle3</div>
}

export function ColorRectangle3({id}) {
    const { renderElements } = useContext(BasicEditorContext)
    const element = renderElements.filter(element => element.data.id === id)[0]
    const style = element.data.style;
    return <div style={style}>
        ColorRectangle3
    </div>
}

export function TextBox({ content, style }: { content: DataObject3Content, style: DataObject3Style }) {

}
