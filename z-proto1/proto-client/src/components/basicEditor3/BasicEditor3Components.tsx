import { useContext, useRef } from "react"
import { BasicEditorContext } from "./basicEditor3"
import { DataObject3Content, DataObject3Style } from "./BasicEditor3Types"
import { isEmpty } from "./utils";

export function RedRectangle3() {
    return <div style={{
        width: '8rem',
        height: '4rem',
        backgroundColor: 'red'
    }}
    >RedRectangle3</div>
}

const colorRectangle3Styles = [{ width: '8rem', height: '4rem', backgroundColor: 'purple' },{ width: '8rem', height: '4rem', backgroundColor: 'red' }, { width: '8rem', height: '4rem', backgroundColor: 'green' }, { width: '8rem', height: '4rem', backgroundColor: 'blue' }];
export function ColorRectangle3({ id }:{id:string}) {
    const { renderElements, baseFunctions } = useContext(BasicEditorContext)
    const element = renderElements.filter(element => element.data.id === id)[0]

    function handleClick() {
        const choice = Math.floor(Math.random() * 3);
        const newStyle = colorRectangle3Styles[choice];
        baseFunctions.setStyle(id, newStyle);
    }

    const defaultStyle = colorRectangle3Styles[0];
    const style = element.data.style;
    const finalStyle = isEmpty(style) ? defaultStyle : style;
    return <div
        onClick={handleClick}
        style={finalStyle}>
        ColorRectangle3
    </div>
}

export function TextBox3({ id }:{id:string}) {
    const { renderElements, baseFunctions } = useContext(BasicEditorContext)
    const element = renderElements.filter(element => element.data.id === id)[0]
    // const textAreaRef = useRef();

    function onTextChange(e) {
        const newText = e.target.value;
        baseFunctions.setContent(id, { text: newText })
    }

    const defaultStyle = { width: '8rem', height: '4rem' };
    const style = element.data.style;
    const finalStyle = isEmpty(style) ? defaultStyle : style;
    return <div>
        TextBox3
        <textarea
            // ref={textAreaRef}
            defaultValue={element.data.content.text}
            onChange={onTextChange}>

        </textarea>
    </div>
}

export function RedTextRectangle3({ id }:{id:string}) {
    const { renderElements, baseFunctions } = useContext(BasicEditorContext)
    const element = renderElements.filter(element => element.data.id === id)[0]
    return <div style={{
        width: '8rem',
        height: '4rem',
        backgroundColor: 'red'
    }}
    >RedRectangle3
    <br></br>
    {element.data.content.textContent}
    </div>
}