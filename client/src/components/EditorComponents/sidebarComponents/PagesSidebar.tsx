import React from "react";
import { useNavigate } from "react-router-dom";

function PagesSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gray-100 text-black">
      {/* Back Button */}
      <button
        onClick={() => navigate("/editor-page/website")}
        className="absolute left-5 top-5 transform flex items-center text-gray-600 hover:text-black p-2 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2" // Added margin to the right of the icon
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
      {/* overflow wrapper */}
      <div className="h-4/5 mt-20 overflow-y-scroll">
        {/* Header */}
        <header className="relative flex items-center h-20 mb-4">
          <div className="flex justify-between w-screen">
            {/* Headline */}
            <h2 className="text-4xl font-bold ml-2">Pages</h2>
            {/* Search Button */}
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
                  fill-rule="evenodd"
                  d="M12.9 14.32a8 8 0 111.42-1.42l4.93 4.93a1 1 0 11-1.42 1.42l-4.93-4.93zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </header>
        {/* Main Navigation Items */}
        <div className="mt-16 text-xl">
          <ul className="space-y-2 mb-4">
            <li className="flex justify-between items-center p-2 rounded-md">
              <span>Main Navigation</span>
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
          <ul className="space-y-2 mb-4">
            <li className="flex justify-between items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer">
              <span>System Pages</span>
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
                  d="M9 5l7 7-7 7" // Reversed the arrow direction
                />
              </svg>
            </li>
            <hr className="my-10 border-gray-300" />
            <li className="flex justify-between items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer">
              <span>Website Tools</span>
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
                  d="M9 5l7 7-7 7" // Reversed the arrow direction
                />
              </svg>
            </li>
            <hr className="my-10 border-gray-300" />
            <li className="flex justify-between items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer">
              <span>Trash</span>
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
                  d="M9 5l7 7-7 7" // Reversed the arrow direction
                />
              </svg>
            </li>
            <hr className="my-10 border-gray-300" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PagesSidebar;
