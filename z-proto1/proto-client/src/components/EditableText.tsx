import React from 'react'
import { useState, useRef } from 'react'

function EditableText() {
    const textAreaRef = useRef();
    const [text, setText] = useState('');

    function handleTextareaChange(e:React.ChangeEvent<HTMLTextAreaElement>){
        setText(e.target.value);
    }

    function handleTestClick(){
        console.log("text:", text)
    };
  return (
    <div>
        <textarea ref={textAreaRef} onChange={handleTextareaChange}>Lorem Ipsum</textarea>
        <button onClick={handleTestClick}>Log current "text" value</button>
        <p>current text area value: {textAreaRef.current.value}</p>
    </div>
  )
}

export default EditableText