import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useUser";
import { deleteToken } from "../lib/api";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { data: userData } = useUserProfile();

  useEffect(() => {
    setIsLoggedIn(!!userData);
  }, [userData]);

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle logout
  const handleLogOut = () => {
    deleteToken();
    setIsLoggedIn(false);
    setIsOpen(false);
    window.location.href = "/login";
  };

  const handleClickProfile = () => {
    setIsOpen(false);
    navigate("/accountdashboard");
  };

  const handleClickLogIn = () => {
    navigate("/login");
  };

  return (
    <div className="relative inline-block">
      {!isLoggedIn ? (
        <button
          onClick={() => {
            handleClickLogIn();
          }}
          className="font-semibold flex text-white items-center justify-center w-14 h-14 rounded-full cursor-pointer overflow-hidden"
        >
          LOG IN
        </button>
      ) : (
        <div
          onClick={toggleDropdown}
          className="flex items-center justify-center w-14 h-14 rounded-full cursor-pointer overflow-hidden"
        >
          <span className="text-white text-xl ml-4">
            {userData?.user?.profileImage ? (
              <img
                className="w-10 h-10 rounded-full object-cover"
                alt="photo profile"
                src={userData.user.profileImage}
              />
            ) : (
              <span className="w-10 h-10 rounded-full bg-black text-white font-bold text-2xl flex items-center justify-center pb-[2px]">
                {userData?.user?.firstName?.charAt(0).toUpperCase()}
              </span>
            )}
          </span>

          <span
            className={`ml-2 w-3 h-3 border-solid border-t-2 border-r-2 border-transparent border-white transform ${
              isOpen ? "rotate-135" : "rotate-45"
            }`}
          />
        </div>
      )}{" "}
      {/* Profile div with arrow */}
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute -right-16 mt-2 w-48 bg-black rounded-lg shadow-lg">
          <ul className="py-2 text-white">
            <li
              onClick={() => {
                handleClickProfile();
              }}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleLogOut}
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
