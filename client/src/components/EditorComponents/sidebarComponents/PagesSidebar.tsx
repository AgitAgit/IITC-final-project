import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import your other sidebar components
import SystemPagesSidebar from "./SystemPagesSidebar";
import WebsiteTools from "./WebsiteTools";
import TrashSidebar from "./TrashSidebar";

function PagesSidebar() {
  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useState("main");

  // Function to render the correct sidebar based on `activeSidebar`
  const renderSidebar = () => {
    switch (activeSidebar) {
      case "systemPages":
        return <SystemPagesSidebar setActiveSidebar={setActiveSidebar} />;
      case "websiteTools":
        return <WebsiteTools setActiveSidebar={setActiveSidebar} />;
      case "trash":
        return <TrashSidebar />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 text-black">
      {/* Back Button */}
      {activeSidebar === "main" && (
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 top-5 transform flex items-center text-gray-600 hover:text-black p-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Home
        </button>
      )}
      {activeSidebar === "main" ? (
        // Main Sidebar Content
        <div className="h-4/5 mt-20 overflow-y-scroll">
          {/* Header */}
          <header className="relative flex items-center h-20 mb-4">
            <div className="flex justify-between w-screen">
              <h2 className="text-4xl font-bold ml-2">Pages</h2>
              <button
                className="inset-y-0 left-5 flex items-center pr-3"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 hover:text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.42-1.42l4.93 4.93a1 1 0 11-1.42 1.42l-4.93-4.93zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </header>
          {/* Main Navigation Items */}
          <div className="mt-16 text-xl">
            <ul className="space-y-2 mb-4">
              <li className="flex justify-between items-center p-2 rounded-md">
                <span>Main Navigation </span>
                <button className="text-gray-600 hover:text-black hover:bg-gray-200 p-3 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14M5 12h14"
                    />
                  </svg>
                </button>
              </li>
              <li className="flex justify-between items-center p-2 rounded-md">
                <span>Not Linked</span>
                <button className="text-gray-600 hover:text-black hover:bg-gray-200 p-3 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14M5 12h14"
                    />
                  </svg>
                </button>
              </li>
            </ul>
            <hr className="my-10 border-gray-300" />

            {/* Utilities Section */}
            <h2 className="text-lg font-semibold mb-2">Utilities</h2>
            <ul className="space-y-2 mb-4 text-base font-semibold">
              <li
                className="relative group flex justify-between items-center p-2 rounded-md cursor-pointer"
                onClick={() => setActiveSidebar("systemPages")}
              >
                <span>
                  System Pages{" "}
                  <span
                    className={`absolute left-0 -bottom-2 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full`}
                  ></span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <hr className="my-10 border-gray-300" />
              <li
                className="relative group flex justify-between items-center p-2 rounded-md cursor-pointer"
                onClick={() => setActiveSidebar("websiteTools")}
              >
                <span>
                  Website Tools{" "}
                  <span
                    className={`absolute left-0 -bottom-2 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full`}
                  ></span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <hr className="my-10 border-gray-300" />
              <li
                className="relative group flex justify-between items-center p-2 rounded-md cursor-pointer"
                onClick={() => setActiveSidebar("trash")}
              >
                <span>
                  Trash{" "}
                  <span
                    className={`absolute left-0 -bottom-2 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full`}
                  ></span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <hr className="my-10 border-gray-300" />
            </ul>
          </div>
        </div>
      ) : (
        // Render the corresponding sidebar component
        renderSidebar()
      )}
    </div>
  );
}

export default PagesSidebar;
