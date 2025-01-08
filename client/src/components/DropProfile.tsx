import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle login/logout
  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Log out
      setIsLoggedIn(false);
      console.log("User logged out.");
    } else {
      navigate("/Login");
    }
    setIsOpen(false); // Close the dropdown after action
  };

  return (
    <div className="relative inline-block">
      {/* Profile div with arrow */}
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-black cursor-pointer"
      >
        <span className="text-white text-xl ml-4">
          {isLoggedIn ? "U" : "G"}
        </span>
        <span
          className={`ml-2 w-3 h-3 border-solid border-t-2 border-r-2 border-transparent border-white transform ${
            isOpen ? "rotate-135" : "rotate-45"
          }`}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute -right-16 mt-2 w-48 bg-black rounded-lg shadow-lg">
          <ul className="py-2 text-white">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleAuthAction}
            >
              {isLoggedIn ? "Log Out" : "Log In"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
