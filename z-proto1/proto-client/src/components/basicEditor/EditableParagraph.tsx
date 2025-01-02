import React, { useState } from 'react';

function EditableParagraph() {
  const [text, setText] = useState('This is editable text.');

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setText(event.currentTarget.innerText); 
  };

  return (
    <div 
      contentEditable 
      onBlur={handleBlur} 
      suppressContentEditableWarning 
    >
      {text}
    </div>
  );
}

export default EditableParagraph;