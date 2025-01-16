import { useEffect, useState } from "react";

import BasicEditor3Pro from "./BasicEditor3Pro";
import {
  BasicEditor3Page,
  BasicEditor3User,
  BasicEditor3Website,
} from "./BasicEditor3ProTypes";
import { Header3Data } from "./Header3";
import { Footer3Data } from "./Footer3";
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

function EditorWrapper({ templete, websiteToEdit, saveCurrentWebsite }) {
  const [currentWebsite, setCurrentWebsite] = useState<BasicEditor3Website>();

  useEffect(() => {
    if (websiteToEdit) {
      setCurrentWebsite(websiteToEdit);
    } else if (templete) {
      setCurrentWebsite(templete);
    } else {
      setCurrentWebsite(defaultWebsite);
    }
  }, [websiteToEdit, templete]);

  // function addWebsite(
  //   name: string,
  //   owner: BasicEditor3User = currentUser,
  //   headerData: Header3Data = defaultHeaderData,
  //   pages: BasicEditor3Page[] = [],
  //   footerData: Footer3Data = {}
  // ) {
  //   const newWebsite: BasicEditor3Website = {
  //     owner,
  //     name,
  //     headerData,
  //     pages,
  //     footerData,
  //   };
  // }

  return (
    <>
      {currentWebsite && (
        <BasicEditor3Pro
          currentWebsite={currentWebsite}
          saveCurrentWebsite={saveCurrentWebsite}
        />
      )}
    </>
  );
}

export default EditorWrapper;
