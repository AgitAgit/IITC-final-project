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
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Popular Designs Templates</h1>
          </div>
          <div></div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DesignCon;
