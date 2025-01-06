import React, { useState } from "react";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      {/* Profile div with arrow */}
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-black cursor-pointer"
      >
        <span className="text-white text-xl">P</span> {/* Example text */}
        {/* Arrow */}
        <span
          className={`ml-2 w-3 h-3 border-solid border-t-2 border-r-2 border-transparent border-black transform ${
            isOpen ? "rotate-135" : "rotate-45"
          }`}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Log Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
