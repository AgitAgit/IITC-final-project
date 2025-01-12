import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { BasicEditor3Page, BasicEditor3Website, RenderElement3, BasicEditor3User } from './BasicEditor3ProTypes'
import { Header3Data } from './Header3'
import { Footer3Data } from './Footer3'

export type WebsiteNav3Props = {
    currentWebsite:BasicEditor3Website
    websites: BasicEditor3Website[]
    currentWebsiteName:string
    setCurrentWebsite:Dispatch<SetStateAction<string>>
    saveChangesToCurrentWebsite:(newWebsite:BasicEditor3Website) => void;
    saveWebsitesToLS:() => void
    retrieveWebsitesFromLS:() => void
    addWebsite:(name: string, owner?: BasicEditor3User, headerData?: Header3Data, pages?: BasicEditor3Page[], footerData?: Footer3Data) => void
}

function WebsiteNav3({websites, currentWebsite, setCurrentWebsite, saveChangesToCurrentWebsite, saveWebsitesToLS, retrieveWebsitesFromLS, addWebsite}:WebsiteNav3Props) {
    // const [pageNames, setPageNames] = useState<string[]>(pages.map(page => page.name));
    const websiteNames = websites.map(website => website.name);
    const inputRef = useRef<HTMLInputElement>();

    function handleAddWebsite(){
        if(!inputRef.current) return;
        const newWebsiteName = inputRef.current.value;
        if(!newWebsiteName || newWebsiteName === '') return;
        addWebsite(newWebsiteName);
        saveWebsitesToLS();
        inputRef.current.value = '';
    }

    function handleNavigateToWebsite(websiteName:string){
        handleSaveClick();
        setCurrentWebsite(websiteName);
    }

    function handleSaveClick(){
        saveChangesToCurrentWebsite()
    }

    return (
        <div style={{border:'1px solid green'}}>
            PageNav3
            <br></br>
            <label>Select a Page:</label>
            <select 
            // ref={selectPageRef}
            onChange={(e) => handleNavigateToPage(e.target.value)}
            >
                {pageNames.map(name => <option key={name}>{name}</option>)}
            </select>
            <div>
                <button onClick={handleAddPage}>Add a new page</button>
                <input ref={inputRef}></input>
            </div>
            <div>
                <button onClick={handleSaveClick}>Save</button>
                {/* <button>Retrieve snapshot</button> */}
            </div>
        </div>
    )
}

export default WebsiteNav3