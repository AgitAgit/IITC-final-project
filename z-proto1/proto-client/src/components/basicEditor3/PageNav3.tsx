import React, { useState, useRef, useEffect } from 'react'

export type PageNav3Props = {
    saveSnapshotToLS:(pageName:string)=>void
    retrieveSnapshotFromLS:(pageName:string)=>void
}

function PageNav3({saveSnapshotToLS, retrieveSnapshotFromLS}:PageNav3Props) {
    // const selectPageRef = useRef();
    const [pageNames, setPageNames] = useState<string[]>(["Home","About","Contact Us"]);
    const [currentPage, setCurrentPage] = useState<string>("Home");
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        console.log("current page:", currentPage);
        retrieveSnapshotFromLS(currentPage);
    }, [currentPage]);

    function handleSaveSnapshot(){
        saveSnapshotToLS(currentPage);
    }

    function handleAddPage(){
        if(!inputRef) return;
        const name = inputRef.current.value;
        if(name === '') return;
        setPageNames(prev => [...prev, name]);
        inputRef.current.value = '';
    }

    return (
        <div style={{border:'1px solid green'}}>
            PageNav3
            <br></br>
            <label>Select a Page:</label>
            <select 
            // ref={selectPageRef}
            onChange={(e) => setCurrentPage(e.target.value)}
            >
                {pageNames.map(name => <option key={name}>{name}</option>)}
            </select>
            <div>
                <button onClick={handleAddPage}>Add a new page</button>
                <input ref={inputRef}></input>
            </div>
            <div>
                <button onClick={handleSaveSnapshot}>Save snapshot</button>
                {/* <button>Retrieve snapshot</button> */}
            </div>
        </div>
    )
}

export default PageNav3