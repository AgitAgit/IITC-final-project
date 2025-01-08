import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import EditProfile from "../components/EditUser/EditProfile";
import { deleteToken } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ChevronLeftIcon } from "lucide-react";
import SideBar from "../components/EditUser/EditProfieSideBar";
import AccountAndSecurity from "../components/AccountAndSecurity";
import Notifications from "../components/Notifications";
import Language from "../components/Language";
import Help from "../components/Help";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Profile");
  const [componentTorender, setComponentToRender] =
    useState<JSX.Element | null>(
      <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />
    );
  const [isMobileView, setIsMobileView] = useState(false);

  const navigate = useNavigate();

  const renderComponent = (menuItem: string) => {
    switch (menuItem) {
      case "Profile":
        return <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />;
      case "Account and security":
        return <AccountAndSecurity />;
      case "Notifications":
        return <Notifications />;
      case "Language":
        return <Language />;
      case "Help":
        return <Help />;
      case "Log out":
        handleLogOut();
      default:
        return <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />;
    }
  };

  const handleLogOut = () => {
    deleteToken();
    navigate("/login");
    window.location.reload();
  };

  const checkMobileView = () => {
    setIsMobileView(window.innerWidth <= 850);
  };

  useEffect(() => {
    window.addEventListener("resize", checkMobileView);
    checkMobileView();

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const handleMoveToSideBar = () => {
    setComponentToRender(
      <SideBar
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
        setIsOpen={setIsOpen}
        setComponentToRender={setComponentToRender}
        renderComponent={renderComponent}
      />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent
        id="cloudinary-container"
        className="bg-white shadow-lg min-w-[430px] sm:w-screen sm:h-screen"
      >
        <div className="flex">
          {isMobileView ? (
            <div className="flex flex-col w-full">
              <div className="absolute mt-5 ml-5">
                {componentTorender?.type?.name !== "SideBar" && (
                  <button
                    className="flex items-center text-gray-700 hover:text-gray-900 group relative"
                    onClick={() => handleMoveToSideBar()}
                  >
                    <ChevronLeftIcon className="h-5 w-5 transition-all duration-300 group-hover:opacity-0" />
                    <ArrowLeftIcon className="h-5 w-5 absolute left-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90" />
                    <span className="ml-2">BACK</span>
                  </button>
                )}
              </div>
              <div className=" w-full h-screen">{componentTorender}</div>
            </div>
          ) : (
            <div className="flex w-full">
              {componentTorender?.type?.name === "SideBar" ? (
                <>
                  <SideBar
                    selectedMenuItem={selectedMenuItem}
                    setSelectedMenuItem={setSelectedMenuItem}
                    setIsOpen={setIsOpen}
                    setComponentToRender={setComponentToRender}
                    renderComponent={renderComponent}
                  />
                  <div className="px-[28px] pb-[20px] pt-6 w-full">
                    <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />
                  </div>
                </>
              ) : (
                <>
                  <SideBar
                    selectedMenuItem={selectedMenuItem}
                    setSelectedMenuItem={setSelectedMenuItem}
                    setIsOpen={setIsOpen}
                    setComponentToRender={setComponentToRender}
                    renderComponent={renderComponent}
                  />
                  {/* Displaying the selected component */}
                  <div className="px-[28px] pb-[20px] pt-6 w-full">
                    {componentTorender}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Profile;
