import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ContentObject, DataDiv } from './BasicEditor2';

const textAreaStyle = {
    border: '1px solid red',
    outline: 'none',
    background:'none',
    resize: 'none',
    padding: 0,
    margin: 0,
    width: 'auto',
    whiteSpace: 'pre-wrap'
}

function EditableText2({dataDiv}:{dataDiv:DataDiv}) {
    const textAreaRef = useRef();
    const [text, setText] = useState(dataDiv.content.initialText);

    useEffect(() => {
        const newContent = { initialText:text };
        dataDiv.setSelfContent(newContent);
        // dataDiv.setSelfContent({})
    },[text])

    function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value);
    }

    function handleTestClick() {
        console.log("text:", text)
        console.log("textAreaRef.current?.value:", textAreaRef.current?.value)
    };

    return (
        <div onClick={(event) => event.stopPropagation()}>
            <textarea
                ref={textAreaRef} onChange={handleTextareaChange}
                defaultValue={text}
                style={textAreaStyle}
            ></textarea>
            <button onClick={handleTestClick}>Log current "text" value</button>
            <p>textAreaRef.current?.value: {textAreaRef.current?.value}</p>
            <p>current "text" value: {text}</p>
        </div>
    )
}

export default EditableText2