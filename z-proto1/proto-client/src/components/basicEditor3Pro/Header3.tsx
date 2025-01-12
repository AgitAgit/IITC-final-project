import React, { useState, useRef, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import { BasicEditor3Page, RenderElement3 } from './BasicEditor3ProTypes'

import defaultLogo from '../../assets/icons8-website-50.png';
import { BasicEditorContext } from './BasicEditor3Pro';

export type Header3Props = {
    pages: BasicEditor3Page[]
    currentPage: string
    setCurrentPage: Dispatch<SetStateAction<string>>
    headerEditMode: boolean
    setHeaderEditMode: Dispatch<SetStateAction<boolean>>
    data: Header3Data
}

export type Header3Data = {
    logo: { text: string, imgSrc: string | null }
    pages: string[]
    hasExtraButton: boolean
    hasSocialLinks: boolean
    hasAccount: boolean
    style: {
        headerStyle: { [key: string]: any }
        logoContainerStyle: { [key: string]: any }
        navContainerStyle: { [key: string]: any }
        navItemStyle: { [key: string]: any }
    }
}

//task DONE.
//Make a header editing mode. It will turn on when clicking the edit header button, and turn off
//when clicking outside of the header and it's editing buttons.

//task
//create the Add Elements menu with the options to add social links, button, and account.
//for now they will add placeholder elements without functionality. 

//don't overdo the design now. focus on functionality.
function Header3({ pages, currentPage, setCurrentPage, headerEditMode, setHeaderEditMode, data }: Header3Props) {
    //will depend on current screen width?
    const { isEditMode } = useContext(BasicEditorContext);
    const [editButtonVisible, setEditButtonVisible] = useState(false);
    const [headerEditButtonsVisible, setHeaderEditButtonsVisible] = useState(false);
    const [addElementsMenuVisible, setAddElementsMenuVisible] = useState(false);
    const [editDesignMenuVisible, setEditDesignMenuVisible] = useState(false);

    const [isHamburger, setIsHamburger] = useState(false);
    // const chosenPagesRef = useRef(pages.map(page => page.name));
    // const [chosenPages, setChosenPages] = useState(pages.map(page => page.name));

    //why are chosen pages not rendered on refresh but are rendered on save?
    //will the original way I did it work okay? Or is it a problem with fetching from
    //local storage or something else entirely?

    const pageNames = pages.map(page => page.name);
    const inputRef = useRef<HTMLInputElement>();

    const logo = {
        text: "LOGO",
        imgSrc: defaultLogo
    }

    const headerStyle = {
        position: 'relative',
        border: '3px solid gray',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    const overlayStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const overlayButtonStyle = {
        border: '2px solid white',
        borderRadius: '0.5rem',
        padding: '0.5rem'
    }

    const logoContainerStyle = {
        padding: '0.5rem 1rem 0.5rem 1rem',
        display: 'flex',
        flexDirection: 'column'
    }

    const navContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0 1rem 0 1rem'
    }

    const navItemStyle = {
        padding: '0.5rem',
        cursor: "pointer"
    }

    const headerEditButtonsContainerStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }

    const menusContainerStyle = {
        width: '100%',
        display: 'flex'
    }

    const addElementsMenuStyle = {
        backgroundColor: 'white',
        color: 'black',
        display: 'flex',
        flexDirection: 'column'
    }

    const editDesignMenuStyle = {
        marginLeft: 'auto',
        backgroundColor: 'white',
        color: 'black'
    }

    function handleNavigateToPage(pageName: string) {
        setCurrentPage(pageName);
    }

    function handleHeaderMouseEnter() {
        if (!isEditMode) return;
        setEditButtonVisible(true);
        window.removeEventListener('click', cancelHeaderEditMode);
    }

    function handleHeaderMouseLeave() {
        setEditButtonVisible(false);
        window.addEventListener('click', cancelHeaderEditMode);
        //what if I will click one of the editing buttons?
        //will stopping the event propagation suffice?
    }

    function cancelHeaderEditMode() {
        setHeaderEditMode(false);
        window.removeEventListener('click', cancelHeaderEditMode);
        setAddElementsMenuVisible(false);
        setEditDesignMenuVisible(false);
    }

    function handleEditSiteHeaderClick() {
        setHeaderEditMode(true);
        setHeaderEditButtonsVisible(true);
    }

    function handleAddHeaderElementsClick(e) {
        e.stopPropagation();
        setHeaderEditButtonsVisible(false);
        setAddElementsMenuVisible(true);
    }

    function handleEditHeaderDesignClick(e) {
        e.stopPropagation();
        setHeaderEditButtonsVisible(false);
        setEditDesignMenuVisible(true);
    }

    function handleToggleElement(e, elementName) {
        e.stopPropagation();
        const checked = e.target.checked;
        if(elementName === 'account') data.hasAccount = !data.hasAccount;
        console.log("data has account",data.hasAccount);
    }

    return (
        <>
            <div onMouseEnter={handleHeaderMouseEnter} onMouseLeave={handleHeaderMouseLeave} style={headerStyle}>
                {editButtonVisible && !headerEditMode &&
                    <div style={overlayStyle}>
                        <button style={overlayButtonStyle} onClick={handleEditSiteHeaderClick}>EDIT SITE HEADER</button>
                    </div>
                }
                <div style={logoContainerStyle}>
                    <img src={logo.imgSrc} />
                    {logo.text}
                </div>
                <div>
                    {/* {isHamburger && hamburger} */}
                    {!isHamburger &&
                        <div style={navContainerStyle}>
                            {
                                (data.pages.length > 0 ?
                                    data.pages.map(name =>
                                        <div key={name} style={navItemStyle} onClick={() => handleNavigateToPage(name)}>{name}</div>
                                    )
                                    :
                                    pages.map(page =>
                                        <div key={page.name} style={navItemStyle} onClick={() => handleNavigateToPage(page.name)}>{page.name}</div>
                                    ))
                            }
                            {
                                data.hasAccount &&
                                <div style={navItemStyle}>Login</div>
                            }
                        </div>
                    }

                </div>
            </div>
            {headerEditMode && headerEditButtonsVisible &&
                <div style={headerEditButtonsContainerStyle}>
                    <button onClick={(e) => handleAddHeaderElementsClick(e)}>ADD ELEMENTS</button>
                    <button onClick={(e) => handleEditHeaderDesignClick(e)}>EDIT DESIGN</button>
                </div>
            }
            <div style={menusContainerStyle}>
                {addElementsMenuVisible && headerEditMode &&
                    <div style={addElementsMenuStyle}>
                        <label>
                            Button
                            <input type='checkbox' onChange={(e) => handleToggleElement(e, 'button')}></input>
                        </label>
                        <label>
                            Social Links
                            <input type='checkbox' onChange={(e) => handleToggleElement(e, 'social_links')}></input>
                        </label>
                        <label>
                            Account
                            <input type='checkbox' onChange={(e) => handleToggleElement(e, 'account')}></input>
                        </label>
                    </div>
                }
                {editDesignMenuVisible && headerEditMode &&
                    <div style={editDesignMenuStyle}>
                        this is the edit design menu
                    </div>
                }
            </div>
        </>
    )
}

export default Header3