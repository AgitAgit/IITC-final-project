import {
  Bold,
  Italic,
  Link,
  AlignLeft,
  Quote,
  List,
  ListOrdered,
  Undo,
  AlignCenter,
  AlignRight,
  Copy,
  Trash2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import ColorPicker from "../../ColorPicker";
import { useState } from "react";

const FormattingToolbar = () => {
  const [textColor, setTextColor] = useState("#000000");

  const paragraphOptions = [
    "Heading 1",
    "Heading 2",
    "Heading 3",
    "Heading 4",
    "Paragraph 1",
    "Paragraph 2",
    "Paragraph 3",
    "Monospace",
  ];

  return (
    <div className="w-fit flex items-center gap-2 p-2 border rounded-md bg-white">
      <div className="relative">
        <select className="p-1 min-w-36 border rounded-md text-sm bg-white hover:bg-gray-50">
          {paragraphOptions.map((option, index) => (
            <option
              key={index}
              value={option.toLowerCase().replace(" ", "-")}
              className="hover:bg-gray-50"
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <div className="flex items-center gap-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Bold size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Italic size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex justify-between items-center cursor-pointer">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: textColor }}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <ColorPicker color={textColor} onChange={setTextColor} />
            </PopoverContent>
          </Popover>{" "}
        </button>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <div className="flex items-center gap-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Link size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded text-sm">Aa</button>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <div className="flex items-center gap-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <AlignLeft size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Quote size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <List size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ListOrdered size={18} />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <div className="flex items-center gap-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Undo size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <AlignCenter size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <AlignRight size={18} />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <div className="flex items-center gap-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Copy size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded text-red-500">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default FormattingToolbar;
