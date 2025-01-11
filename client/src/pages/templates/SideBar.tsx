import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";

interface AppSidebarProps {
  markedTypes: Record<string, boolean>;
  setMarkedTypes: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

// Define the filtering groups and items
const items = [
  {
    category: "Type",
    filters: [
      { title: "Online Store", url: "#online-store" },
      { title: "Portfolio", url: "#portfolio" },
      { title: "Memberships", url: "#memberships" },
      { title: "Blog", url: "#blog" },
      { title: "Scheduling", url: "#scheduling" },
      { title: "One Page", url: "#one-page" },
      { title: "Courses", url: "#courses" },
      { title: "Services", url: "#services" },
      { title: "Donations", url: "#donations" },
    ],
  },
  {
    category: "Topic",
    filters: [
      { title: "Popular Designs", url: "#popular-designs" },
      { title: "All Templates", url: "#all-templates" },
      { title: "Collaborations", url: "#collaborations" },
      { title: "Art & Design", url: "#art-design" },
      { title: "Community & Non-Profits", url: "#community-nonprofits" },
      { title: "Entertainment", url: "#entertainment" },
      { title: "Events", url: "#events" },
      { title: "Fashion", url: "#fashion" },
      { title: "Fitness", url: "#fitness" },
      { title: "Food", url: "#food" },
      { title: "Health & Beauty", url: "#health-beauty" },
      { title: "Home & Decor", url: "#home-decor" },
      { title: "Local Business", url: "#local-business" },
      { title: "Media & Podcasts", url: "#media-podcasts" },
      { title: "Nature & Animals", url: "#nature-animals" },
      { title: "Personal & CV", url: "#personal-cv" },
      { title: "Photography", url: "#photography" },
      { title: "Professional Services", url: "#professional-services" },
      { title: "Real Estate & Properties", url: "#real-estate" },
      { title: "Restaurants", url: "#restaurants" },
      { title: "Travel", url: "#travel" },
      { title: "Weddings", url: "#weddings" },
    ],
  },
];

export function AppSidebar({ markedTypes, setMarkedTypes }: AppSidebarProps) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  // Function to toggle the mark state of types
  const toggleTypeMark = (title: string): void => {
    setMarkedTypes((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar className="absolute p-4 py-8 w-64 bg-transparent h-full">
      <SidebarContent>
        {items.map((group) => (
          <SidebarGroup key={group.category}>
            {group.category === "Topic" && <hr className="my-12" />}
            <SidebarGroupLabel className="font-bold text-black text-lg mb-5">
              {group.category}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.filters.map((filter) => (
                  <SidebarMenuItem key={filter.title}>
                    <SidebarMenuButton asChild>
                      <div
                        className="flex items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                        onClick={() =>
                          group.category === "Type" &&
                          toggleTypeMark(filter.title)
                        }
                      >
                        {/* Checkbox for "Type" filters */}
                        {group.category === "Type" && (
                          <div
                            className={`w-5 h-5 mr-3 border-2 rounded-sm flex items-center justify-center ${
                              markedTypes[filter.title]
                                ? "border-black"
                                : "border-gray-400"
                            }`}
                          >
                            {markedTypes[filter.title] && (
                              <span className="text-black font-bold text-sm">
                                ✔
                              </span>
                            )}
                          </div>
                        )}
                        <span>{filter.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <hr className="my-8" />
        <div
          onClick={() => navigate("/my-favorites")}
          className="flex items-center justify-evenly px-2 mb-6 cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-lg font-bold text-black">
            My Favorites ({favorites.length})
          </h3>
          <span
            className={`relative transition-colors duration-300 text-3xl text-transparent
            }`}
            style={{
              WebkitTextStroke: "2px black",
              zIndex: 20, // Ensure the heart icon is on top
            }}
          >
            ♥
          </span>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
