import React from 'react'

function ButtonRandom(){
  const [num, setNum] = useState(0);
  function handleClick(){
      setNum(Math.ceil(Math.random() * 100));
  }
  return <button onClick={handleClick}>{num}</button>
}


//goal1: 
// generate a menue with 3 buttons, each one generate a different component;
//The buttons should create new elements using drag and drop mechanics;

//goal2: 
// generate a page layout object that records all the objects and their positions and data;
// save 2 pre-made pages and toggle between them;

function BasicEditor2() {
  const [renderElements, setRenderElements] = useState([])

  return (
    <div>
    </div>
  )
}

export default BasicEditor2