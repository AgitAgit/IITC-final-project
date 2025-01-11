import React, { useState } from "react";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "./SideBar";
import { SidebarTrigger } from "../../components/ui/sidebar";
import Card from "./TemplateCard";

// Example card data (replace with real data)
const DummyData = [
  {
    title: "Modern Online Store",
    type: "Online Store",
    imageUrl: "https://via.placeholder.com/300x200?text=Online+Store",
  },
  {
    title: "Creative Portfolio",
    type: "Portfolio",
    imageUrl: "https://via.placeholder.com/300x200?text=Portfolio",
  },
  {
    title: "Membership Platform",
    type: "Memberships",
    imageUrl: "https://via.placeholder.com/300x200?text=Memberships",
  },
  {
    title: "Personal Blog",
    type: "Blog",
    imageUrl: "https://via.placeholder.com/300x200?text=Personal+Blog",
  },
  {
    title: "Scheduling Assistant",
    type: "Scheduling",
    imageUrl: "https://via.placeholder.com/300x200?text=Scheduling",
  },
  {
    title: "One Page Portfolio",
    type: "One Page",
    imageUrl: "https://via.placeholder.com/300x200?text=One+Page",
  },
  {
    title: "Online Courses",
    type: "Courses",
    imageUrl: "https://via.placeholder.com/300x200?text=Courses",
  },
  {
    title: "Professional Services",
    type: "Services",
    imageUrl: "https://via.placeholder.com/300x200?text=Services",
  },
  {
    title: "Donation Platform",
    type: "Donations",
    imageUrl: "https://via.placeholder.com/300x200?text=Donations",
  },
  {
    title: "E-Commerce Site",
    type: "Online Store",
    imageUrl: "https://via.placeholder.com/300x200?text=Online+Store",
  },
  {
    title: "Freelancer Portfolio",
    type: "Portfolio",
    imageUrl: "https://via.placeholder.com/300x200?text=Portfolio",
  },
  {
    title: "Community Membership",
    type: "Memberships",
    imageUrl: "https://via.placeholder.com/300x200?text=Memberships",
  },
  {
    title: "Travel Blog",
    type: "Blog",
    imageUrl: "https://via.placeholder.com/300x200?text=Travel+Blog",
  },
  {
    title: "Appointment Scheduler",
    type: "Scheduling",
    imageUrl: "https://via.placeholder.com/300x200?text=Scheduling",
  },
  {
    title: "Minimalist One Page",
    type: "One Page",
    imageUrl: "https://via.placeholder.com/300x200?text=One+Page",
  },
  {
    title: "Learning Platform",
    type: "Courses",
    imageUrl: "https://via.placeholder.com/300x200?text=Courses",
  },
  {
    title: "Consulting Services",
    type: "Services",
    imageUrl: "https://via.placeholder.com/300x200?text=Services",
  },
  {
    title: "Charity Donation Site",
    type: "Donations",
    imageUrl: "https://via.placeholder.com/300x200?text=Donations",
  },
];
function DesignCon() {
  const [markedTypes, setMarkedTypes] = useState<Record<string, boolean>>({});

  // Filter cards based on the marked "Types" from the sidebar
  const filteredCards = DummyData.filter((card) =>
    Object.keys(markedTypes).some(
      (type) => markedTypes[type] && card.type === type
    )
  );

  // Show all cards if no type is selected
  const cardsToRender = Object.values(markedTypes).some(Boolean)
    ? filteredCards
    : DummyData;

  return (
    <SidebarProvider>
      <div className="my-14 flex relative">
        {/* Sidebar Section */}
        <div className="w-64">
          <AppSidebar
            markedTypes={markedTypes}
            setMarkedTypes={setMarkedTypes}
          />
        </div>
        {/* Main Content Section */}
        <div className="flex-grow px-6">
          <div className="flex items-center mb-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Popular Designs Templates</h1>
          </div>
          {/* Render Cards */}
          <div>
            {cardsToRender.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                No templates match the selected filters.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto max-h-screen scrollbar-hide">
                {cardsToRender.map((card) => (
                  <Card
                    key={card.title}
                    title={card.title}
                    type={card.type}
                    imageUrl={card.imageUrl}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DesignCon;
