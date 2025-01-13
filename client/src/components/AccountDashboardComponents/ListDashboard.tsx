import CardDropDown from "./CardDropDown";

const fakeSites = [
  {
    name: "TechBuzz",
    domain: "www.techbuzz.com",
    thumbnail: "https://via.placeholder.com/150?text=TechBuzz",
    creationDate: "2020-05-15",
  },
  {
    name: "FoodiesHub",
    domain: "www.foodieshub.com",
    thumbnail: "https://via.placeholder.com/150?text=FoodiesHub",
    creationDate: "2018-09-10",
  },
  {
    name: "TravelNow",
    domain: "www.travelnow.com",
    thumbnail: "https://via.placeholder.com/150?text=TravelNow",
    creationDate: "2019-07-22",
  },
  {
    name: "FitnessPro",
    domain: "www.fitnesspro.com",
    thumbnail: "https://via.placeholder.com/150?text=FitnessPro",
    creationDate: "2021-02-14",
  },
];

interface ListDashboardProps {
  activeTab: string;
  searchValue: string; //
}
const ListDashboard: React.FC<ListDashboardProps> = ({
  activeTab,
  searchValue,
}) => {
  const filteredSites = fakeSites.filter((site) =>
    site.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      className={`${
        activeTab === "table" ? "border-2 border-black p-10 m-10" : ""
      } py-5`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {filteredSites.length > 0 ? (
          filteredSites.map((site: any, index) => (
            <div
              key={index}
              className="border relative shadow-lg flex flex-col lg:flex-row items-center lg:items-start mb-10"
            >
              <div className="relative group w-full lg:w-[350px] h-[260px]">
                <img
                  src={site.thumbnail}
                  alt={site.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-25 transition duration-300 flex items-center justify-center">
                  <button
                    onClick={() => (window.location.href = site.websiteUrl)}
                    className="relative opacity-0 group-hover:opacity-100 text-white bg-black px-4 py-2 overflow-hidden transition duration-300"
                  >
                    <span className="z-10">Go to Website</span>
                  </button>
                </div>
              </div>

              <div className="relative lg:ml-6  lg:mt-0 text-start lg:text-left p-4 flex flex-col gap-5 w-full">
                <div className="absolute right-0 top-0 mr-4 mt-4">
                  <CardDropDown />
                </div>

                <h3 className="text-lg font-semibold">{site.name}</h3>
                <p className="text-sm text-gray-600">{site.domain}</p>
                <p className="text-sm text-gray-600">
                  Website trial expires on{" "}
                  {new Date(site.creationDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="flex font-semibold justify-center lg:justify-start gap-4 mt-4">
                  <button
                    onClick={() => (window.location.href = site.websiteUrl)}
                    className="relative overflow-hidden px-4 py-2 bg-white text-black rounded group border-[1px] min-w-[95px]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-transparent to-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    Website
                  </button>
                  <button
                    onClick={() => (window.location.href = site.sellingUrl)}
                    className="relative overflow-hidden px-4 py-2 bg-white text-black rounded group border-[1px] min-w-[95px]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-transparent to-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    Selling
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No results found for "{searchValue}"
          </p>
        )}
      </div>
    </div>
  );
};

export default ListDashboard;
