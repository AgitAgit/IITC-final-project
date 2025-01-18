import { useState } from "react";

const DialogEditElement = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [cornerRadius, setCornerRadius] = useState(0);

  return (
    <div className="w-full max-w-md p-4">
      {/* Header Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 mr-4 ${
            activeTab === "content" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setActiveTab("content")}
        >
          Content
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "design" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setActiveTab("design")}
        >
          Design
        </button>
      </div>

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="space-y-6">
          {/* Add Media Button */}
          {/* <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
            <span className="block mb-2">+ Replace or add image/video</span>
          </div> */}

          {/* Text Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Text:</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border-b border-gray-200 focus:border-black transition-colors duration-300 outline-none"
                placeholder="Enter text"
              />
            </div>
          </div>

          {/* Link Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Link:</label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-2 border-b border-gray-200 focus:border-black transition-colors duration-300 outline-none"
                placeholder="Enter link"
              />
            </div>
          </div>
        </div>
      )}

      {/* Design Tab */}
      {activeTab === "design" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="block text-sm font-medium">Corner Radius:</span>
            <input
              type="number"
              className="w-full p-2 border-b border-gray-200 focus:border-black transition-colors duration-300 outline-none"
              value={cornerRadius}
              onChange={(e) => setCornerRadius(parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogEditElement;
