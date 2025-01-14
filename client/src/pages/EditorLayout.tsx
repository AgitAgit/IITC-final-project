import { useState } from "react";
import EditorHeader from "../components/EditorComponents/EditorHeader";
import EditorSideBar from "../components/EditorComponents/EditorSidebar";
import EditorPage from "../components/EditorComponents/EditorTemplateCard";

function EditorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  // Function to toggle sidebar layout
  const toggleSidebarLayout = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Function to set view mode (mobile or full)
  const setMobileView = (view: "mobile" | "full") => {
    setIsMobileView(view === "mobile");
    console.log(isMobileView);
  };

  return (
    <div className="flex min-h-screen overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={`flex-shrink-0 ${
          isSidebarOpen ? "w-72" : "hidden"
        } transition-all duration-300`}
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
        />
        {/* EditorPage */}
        <div
          className={`absolute top-24 bottom-0 ${
            isMobileView
              ? "w-[375px] mx-auto left-0 right-0"
              : "w-full left-0 right-0"
          } ${
            isSidebarOpen ? "overflow-x-scroll" : "overflow-auto"
          } bg-gray-100 shadow transition-all duration-300`}
        >
          <EditorPage isMobileView={isMobileView} /> {/* Pass isMobileView */}
        </div>
      </div>
    </div>
  );
}

export default EditorLayout;
