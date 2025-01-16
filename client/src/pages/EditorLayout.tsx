import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditorHeader from "../components/EditorComponents/EditorHeader";
import EditorSideBar from "../components/EditorComponents/EditorSidebar";
import EditorWrapper from "../components/basicEditor3Pro/EditorWrapper";
import { useCreateSite, useUpdateSite } from "../hooks/useSite";
import { useUserProfile } from "../hooks/useUser";
import { ISite } from "../types/siteTypes";
import { dataStringToWebsite } from "../components/basicEditor3Pro/utils";
import LoadingSpinner from "../components/LoadingSpinner";
import WebsiteNameDialog from "../components/WebsiteNameDialog";

function EditorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [templete, setTemplete] = useState();
  const [websiteToEdit, setWebsiteToEdit]: any = useState(null);
  const [isOpenDialogName, setIsOpenDialogName] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [websiteToSave, setWebsiteToSave]: any = useState();

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: createNewSite } = useCreateSite({
    onSuccess: () => {
      navigate("/accountdashboard/dashboard");
      window.location.reload();
    },
  });

  const { mutate: updateSite } = useUpdateSite({
    onSuccess: () => {
      navigate("/accountdashboard/dashboard");
      window.location.reload();
    },
  });

  const { data: userData, isLoading } = useUserProfile();

  // Effect to fetch the website to edit
  useEffect(() => {
    if (!userData || !id) return;

    const existWeb = userData?.user?.sites.find((site: any) => site._id === id);
    if (existWeb) {
      const web = dataStringToWebsite(existWeb.data);
      setWebsiteToEdit(web);
    }
  }, [userData, id]);

  // Handle save action
  function saveCurrentWebsite(currentWebsite: ISite) {
    const websiteDataString = JSON.stringify(currentWebsite);
    setWebsiteToSave(websiteDataString);

    if (websiteToEdit) {
      updateSite({
        siteId: id!,
        updatedData: { data: websiteDataString },
      });
    } else {
      if (!websiteName) {
        setIsOpenDialogName(true);
        return;
      }
    }
  }

  useEffect(() => {
    if (!websiteName || websiteToEdit) return;
    if (websiteToSave) {
      createNewSite({
        data: websiteToSave,
        owner: userData?.user?._id,
        screenShot:
          "https://images.squarespace-cdn.com/content/624b503a44c70245022f56eb/4f087c54-b53a-44f7-9234-01f8e58d8ffb/image-asset.jpeg?content-type=image%2Fjpeg&amp;format=1000w",
        name: websiteName,
        domain: `${websiteName}SquarespaceServices`,
      });
    }
  }, [websiteName]);

  // Toggle sidebar layout
  const toggleSidebarLayout = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Set mobile view mode
  const setMobileView = (view: "mobile" | "full") => {
    setIsMobileView(view === "mobile");
  };

  // Set the page position based on location
  const counterPageTop =
    location.pathname === "/"
      ? "top-0"
      : location.pathname === "/editor-page/website" ||
        location.pathname === "/editor-page/website/pages"
      ? "top-[73px]"
      : "top-0";

  // Loading spinner if data is still loading
  if (isLoading) {
    return (
      <div className="absolute right-0 top-0 mr-4 mt-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden relative ">
      {/* Sidebar */}
      <div
        className={`flex-shrink-0 ${
          isSidebarOpen ? "w-72" : "w-0"
        } overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ height: "100vh" }}
      >
        <EditorSideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <EditorHeader
          toggleSidebarLayout={toggleSidebarLayout}
          setMobileView={setMobileView}
          isMobileView={isMobileView}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Editor Page */}
        <div
          className={`absolute ${counterPageTop} transition-all duration-500 bottom-0 ${
            isMobileView
              ? "w-[375px] mx-auto left-0 right-0"
              : "w-full h-screen left-0 right-0"
          } ${
            isSidebarOpen ? "overflow-x-scroll" : "overflow-auto"
          } bg-white shadow transition-all duration-300 overflow-y-scroll`}
        >
          <EditorWrapper
            templete={templete}
            websiteToEdit={websiteToEdit}
            saveCurrentWebsite={saveCurrentWebsite}
          />
        </div>
      </div>

      {isOpenDialogName && (
        <WebsiteNameDialog
          setWebsiteName={(name) => {
            setWebsiteName(name);
          }}
          setIsOpen={(isOpen) => setIsOpenDialogName(isOpen)} // סוגר את הדיאלוג
        />
      )}
    </div>
  );
}

export default EditorLayout;
