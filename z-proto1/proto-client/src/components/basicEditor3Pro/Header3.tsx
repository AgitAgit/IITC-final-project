import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { BasicEditor3Page, RenderElement3 } from './BasicEditor3ProTypes'

import defaultLogo from '../../assets/icons8-website-50.png';

export type Header3Props = {
    pages: BasicEditor3Page[]
    currentPage: string
    setCurrentPage: Dispatch<SetStateAction<string>>
    data:Header3Data
}

export type Header3Data = {
    logo: { text:string, imgSrc:string}
    style: {
        headerStyle:{[key:string]:any}
        logoContainerStyle:{[key:string]:any}
        navContainerStyle:{[key:string]:any}
        navItemStyle:{[key:string]:any}
    }   
}

//I will probably need to make a header data object to remember it's style.
//Or I could use the normal render element model and specify the kind as header?
function Header3({ pages, currentPage, setCurrentPage, data }: Header3Props) {
    //will depend on current screen width?    
    const [isHamburger, setIsHamburger] = useState(false);

    const pageNames = pages.map(page => page.name);
    const inputRef = useRef<HTMLInputElement>();


    const logo = {
        text:"LOGO",
        imgSrc:defaultLogo
    }

    const headerStyle = {
        border: '3px solid gray',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center'
    }

    const logoContainerStyle = {
        padding:'0.5rem 1rem 0.5rem 1rem',
        display:'flex',
        flexDirection:'column'
    }

    const navContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        padding:'0 1rem 0 1rem'
    }

    const navItemStyle = {
        padding:'0.5rem',
        cursor:"pointer"
    }

    function handleNavigateToPage(pageName: string) {
        setCurrentPage(pageName);
    }

    return (
        <div style={headerStyle}>
            <div style={logoContainerStyle}>
                <img src={logo.imgSrc} />
                {logo.text}
            </div>
            <div>
                {/* {isHamburger && hamburger} */}
                {!isHamburger &&
                    <div style={navContainerStyle}>
                        {
                            pageNames.map(name =>
                                <div key={name} style={navItemStyle} onClick={() => handleNavigateToPage(name)}>{name}</div>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Header3