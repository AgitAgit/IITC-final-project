import React, {useState} from 'react'

import BasicEditor3Pro from './BasicEditor3Pro'
import { BasicEditor3Website } from './BasicEditor3ProTypes'
import { Header3Data } from './Header3'

const defaultHeaderData:Header3Data = {
  logo:{ text:"LOGO1", imgSrc:null},
  pages:[],
  hasExtraButton:false,
  hasSocialLinks:false,
  hasAccount:true,
  style:{ headerStyle:{}, logoContainerStyle:{}, navContainerStyle:{}, navItemStyle:{}}
}

const defaultWebsite:BasicEditor3Website = {
  owner:{ mongoId:'1234abcd', username:'user1'},
  name:'defaultWebsite1',
  headerData:defaultHeaderData,
  pages:[{name:"Home2", renderElements:[]}],
  footerData:{}
}


function Wrapper3Pro() {
    const [websites, setWebsites] = useState<BasicEditor3Website[]>([defaultWebsite]);
    const [currentWebsite, setCurrentWebsite] = useState<string>(websites[0].name);
    const websiteToPass = websites.find(website => website.name = currentWebsite);

  return (
    <BasicEditor3Pro websites={websites} website={websiteToPass} setCurrentWebsite={setCurrentWebsite}/>
  )
}

export default Wrapper3Pro