import React, { useEffect, useState } from "react";

import BasicEditor3Pro from "./BasicEditor3Pro";
import {
  BasicEditor3Page,
  BasicEditor3User,
  BasicEditor3Website,
} from "./BasicEditor3ProTypes";
import WebsiteNav3 from "./WebsiteNav3";
import { Header3Data } from "./Header3";
import { hydrateWebsites, dataStringToWebsite } from "./utils";
import { Footer3Data } from "./Footer3";
import DisplayWebsite3 from "../basicDisplay3Pro/DisplayWebsite3";
import { useCreateSite } from "../../hooks/useSite";
import { useUserProfile } from "../../hooks/useUser";


const defaultHeaderData: Header3Data = {
  logo: { text: "LOGO1", imgSrc: null },
  pages: [],
  hasExtraButton: false,
  hasSocialLinks: false,
  hasAccount: true,
  style: {
    headerStyle: {},
    logoContainerStyle: {},
    navContainerStyle: {},
    navItemStyle: {},
  },
};

const defaultUser = { mongoId: "1234abcd", username: "user1" };

const defaultWebsite: BasicEditor3Website = {
  owner: defaultUser,
  name: "defaultWebsite0",
  headerData: defaultHeaderData,
  pages: [
    { name: "Home2", renderElements: [] },
    { name: "Home3", renderElements: [] },
  ],
  footerData: {},
};

export type Wrapper3ProProps = {
  currentUser: BasicEditor3User;
};


//for taking the string from the db and turning it into a website:
//dataStringToWebsite takes a websiteDataString and returns a BasicEditor3Website

//for adding a new website:
//conform to the BasicEditor3Website type, can use the addWebsite function here for reference.


function EditorWrapper({ currentUser = defaultUser }: Wrapper3ProProps) {
  const [currentWebsite, setCurrentWebsite] = useState<BasicEditor3Website>();

  const { mutate: createNewSite } = useCreateSite();
  const { data: userData } = useUserProfile();


  //this is sort of an interface. keep this function name and signature unchanged.
  function saveCurrentWebsite() {
    createNewSite({
      data: websiteDataString,
      owner: userData?.user?._id,
      screenShot:
        "https://images.squarespace-cdn.com/content/624b503a44c70245022f56eb/4f087c54-b53a-44f7-9234-01f8e58d8ffb/image-asset.jpeg?content-type=image%2Fjpeg&amp;format=1000w",
      name: "First website",
      domain: "jjsjdcvhs324jb23h4.jhsdhv",
    });
  }


  function addWebsite(
    name: string,
    owner: BasicEditor3User = currentUser,
    headerData: Header3Data = defaultHeaderData,
    pages: BasicEditor3Page[] = [],
    footerData: Footer3Data = {}
  ) {
    const newWebsite: BasicEditor3Website = {
      owner,
      name,
      headerData,
      pages,
      footerData,
    };
}

  return (
    <>
      <BasicEditor3Pro
        currentWebsite={currentWebsite}
        saveCurrentWebsite={saveCurrentWebsite}
      />
    </>
  );
}

export default EditorWrapper;
