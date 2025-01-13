import React, { useState } from 'react'

import BasicEditor3Pro from './BasicEditor3Pro'
import { BasicEditor3Page, BasicEditor3User, BasicEditor3Website } from './BasicEditor3ProTypes'
import WebsiteNav3 from './WebsiteNav3'
import { Header3Data } from './Header3'
import { hydrateWebsites } from './utils'
import { Footer3Data } from './Footer3'

const defaultHeaderData: Header3Data = {
    logo: { text: "LOGO1", imgSrc: null },
    pages: [],
    hasExtraButton: false,
    hasSocialLinks: false,
    hasAccount: true,
    style: { headerStyle: {}, logoContainerStyle: {}, navContainerStyle: {}, navItemStyle: {} }
}

const defaultUser = { mongoId: '1234abcd', username: 'user1' }

const defaultWebsite: BasicEditor3Website = {
    owner: defaultUser,
    name: 'defaultWebsite1',
    headerData: defaultHeaderData,
    pages: [{ name: "Home2", renderElements: [] }],
    footerData: {}
}


export type Wrapper3ProProps = {
    currentUser: BasicEditor3User
}

function Wrapper3Pro({ currentUser = defaultUser }: Wrapper3ProProps) {
    const [isEditMode, setIsEditMode] = useState(true);
    const [headerEditMode, setHeaderEditMode] = useState(false);

    const [websites, setWebsites] = useState<BasicEditor3Website[]>([defaultWebsite]);
    const [currentWebsite, setCurrentWebsite] = useState<BasicEditor3Website>(websites[0]);
    const [headerData, setHeaderData] = useState(currentWebsite.headerData);
    const pages = currentWebsite.pages;
    const [currentPage, setCurrentPage] = useState<BasicEditor3Page>();

    function saveChangesToCurrentWebsite(newWebsite: BasicEditor3Website) {
        if (websites.length > 0) {
            const websiteIndex = websites.findIndex(website => website.name === newWebsite.name);
            if (websiteIndex === -1) {
                setWebsites(prev => [...prev, newWebsite])
            }
            else {
                const newWebsites = [...websites];
                newWebsites[websiteIndex] = newWebsite;
                // setWebsites(newWebsites);
            }
        }
        else setWebsites([newWebsite]);
    }

    function saveWebsitesToLS() {
        try {
            const websitesSnapshot = JSON.stringify(websites);
            localStorage.setItem("websites", websitesSnapshot);
        } catch (error) {
            console.error(error);
        }
    }

    function retrieveWebsitesFromLS() {
        try {
            const websitesSnapshot = localStorage.getItem("websites");
            if (!websitesSnapshot) return;
            const retrieved = JSON.parse(websitesSnapshot)
            console.log("pre hydration websites:", retrieved);
            hydrateWebsites(retrieved);
            console.log("post hydration websites:", retrieved);
            setWebsites(retrieved);
        } catch (error) {
            console.error(error);
        }
    }

    function addWebsite(name: string, owner: BasicEditor3User = currentUser, headerData: Header3Data = defaultHeaderData, pages: BasicEditor3Page[] = [], footerData: Footer3Data = {}) {
        const newWebsite: BasicEditor3Website = { owner, name, headerData, pages, footerData }
        if (websites.find(website => website.name === newWebsite.name)) {
            console.log("This name is already taken");
            return;
        }
        setWebsites(prev => [...prev, newWebsite]);
    }

    return (
        <>
            Wrapper3Pro
            <button onClick={retrieveWebsitesFromLS}>retrieveWebsites</button>
            <WebsiteNav3 websites={websites} currentWebsite={currentWebsite} setCurrentWebsite={setCurrentWebsite} saveChangesToCurrentWebsite={saveChangesToCurrentWebsite} saveWebsitesToLS={saveWebsitesToLS} retrieveWebsitesFromLS={retrieveWebsitesFromLS} addWebsite={addWebsite} />
            <BasicEditor3Pro currentWebsite={currentWebsite} />
        </>
    )
}

export default Wrapper3Pro