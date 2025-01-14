import React from "react";

interface EditorHeaderProps {
  toggleSidebarLayout: () => void;
  setMobileView: (view: "mobile" | "full") => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  toggleSidebarLayout,
  setMobileView,
}) => {
  return (
    <div className="w-[99%] h-16 border-b shadow-md flex justify-between items-center p-5 mt-2">
      {/* Sidebar toggle */}
      <h1
        onClick={toggleSidebarLayout}
        className="hover:bg-slate-50 p-3 cursor-pointer"
      >
        Edit
      </h1>
      {/* Buttons for switching views */}
      <div className="flex gap-4">
        {/* Mobile View Button */}
        <button
          onClick={() => setMobileView("mobile")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2"
          aria-label="Switch to Mobile View"
        >
          <svg
            fill="currentColor"
            height="22"
            viewBox="0 0 22 22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 16H8v2h6v-2z"></path>
            <path
              clipRule="evenodd"
              d="M14 1H8a3 3 0 00-3 3v14a3 3 0 003 3h6a3 3 0 003-3V4a3 3 0 00-3-3zM7 4a1 1 0 011-1h6a1 1 0 011 1v14a1 1 0 01-1 1H8a1 1 0 01-1-1V4z"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>

        {/* Full View Button */}
        <button
          onClick={() => setMobileView("full")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2"
          aria-label="Switch to Full View"
        >
          <svg
            fill="currentColor"
            height="22"
            viewBox="0 0 22 22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M2 3h18v13h-8v2h3v2H7v-2h3v-2H2V3zm2 2v9h14V5H4z"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
