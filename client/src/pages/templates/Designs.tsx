import React, { useState } from "react";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "./SideBar";
import { SidebarTrigger } from "../../components/ui/sidebar";
import CardContainer from "./CardContainer";

// Example card data (replace with real data)
const cardData = [
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
    title: "Membership Site",
    type: "Memberships",
    imageUrl: "https://via.placeholder.com/300x200?text=Memberships",
  },
  // Add more cards as needed
];

function DesignCon() {
  const [markedTypes, setMarkedTypes] = useState<Record<string, boolean>>({});

  // Filter cards based on the marked "Types" from the sidebar
  const filteredCards = cardData.filter((card) =>
    Object.keys(markedTypes).some(
      (type) => markedTypes[type] && card.type === type
    )
  );

  // Show all cards if no type is selected
  const cardsToRender = Object.values(markedTypes).some(Boolean)
    ? filteredCards
    : cardData;

  return (
    <SidebarProvider>
      <div className="mt-14 flex relative">
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
          <div>
            <CardContainer cards={cardsToRender} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DesignCon;
