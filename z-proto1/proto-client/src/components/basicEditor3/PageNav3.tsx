import React, { useState, useRef } from 'react'

function PageNav3() {
    const selectPageRef = useRef();
    const [pageNames, setPageNames] = useState<string[]>(["Home","About","Contact Us"])
    return (
        <div style={{border:'1px solid green'}}>
            PageNav3
            <select 
            ref={selectPageRef}
            defaultValue={"select page"}>
                {pageNames.map(name => <option>{name}</option>)}
            </select>
        </div>
    )
}

export default PageNav3