import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import EditorHeader from "../components/EditorComponents/EditorHeader";
import EditorSideBar from "../components/EditorComponents/EditorSidebar";
import Wrapper3Pro from "../components/basicEditor3Pro/Wrapper3Pro";
// import EditorPage from "../components/EditorComponents/EditorTemplateCard";

function EditorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();

  // Function to toggle sidebar layout
  const toggleSidebarLayout = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Function to set view mode (mobile or full)
  const setMobileView = (view: "mobile" | "full") => {
    setIsMobileView(view === "mobile");
    console.log(isMobileView);
  };

  const counterPageTop =
    location.pathname === "/"
      ? "top-0"
      : location.pathname === "/editor-page/website" ||
        location.pathname === "/editor-page/website/pages"
      ? "top-[73px]"
      : "top-0";

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
        {/* EditorPage */}
        <div
          className={`absolute ${counterPageTop} transition-all duration-500 bottom-0 ${
            isMobileView
              ? "w-[375px] mx-auto left-0 right-0"
              : "w-full h-screen left-0 right-0"
          } ${
            isSidebarOpen ? "overflow-x-scroll" : "overflow-auto"
          } bg-white shadow transition-all duration-300 overflow-y-scroll`}
        >
          {/* <EditorPage isMobileView={isMobileView} /> */}
          <Wrapper3Pro />
          <div>
            {/* <Outlet /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorLayout;
