import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { BasicEditor3Page, RenderElement3 } from './BasicEditor3ProTypes'

export type Header3Props = {
    pages: BasicEditor3Page[]
    currentPage:string
    setCurrentPage:Dispatch<SetStateAction<string>>
}

function Header3({pages, currentPage, setCurrentPage}:Header3Props) {
    //will depend on current screen width?    
    const [isHamburger, setIsHamburger] = useState(false);

    const pageNames = pages.map(page => page.name);
    const inputRef = useRef<HTMLInputElement>();

    const headerStyle = {

    }
    function handleNavigateToPage(pageName:string){
        setCurrentPage(pageName);
    }

    return (
        <div style={headerStyle}>
            <div>LOGO</div>
            
            <div></div>
        </div>
    )
}

export default Header3