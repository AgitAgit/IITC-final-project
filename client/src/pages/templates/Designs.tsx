import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "./SideBar";
import { SidebarTrigger } from "../../components/ui/sidebar";

function DesignCon() {
  return (
    <SidebarProvider>
      <div className="mt-14 flex relative">
        {/* Sidebar Section */}
        <div className="w-64">
          <AppSidebar />
        </div>
        {/* Main Content Section */}
        <div className="flex-grow px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Popular Designs Templates</h1>
            {/* Sidebar Trigger */}
            <SidebarTrigger />
          </div>

          {/* Additional Content Goes Here */}
          <p>
            Browse our extensive collection of design templates that cater to
            various needs. Customize them easily and make them your own!
          </p>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DesignCon;
