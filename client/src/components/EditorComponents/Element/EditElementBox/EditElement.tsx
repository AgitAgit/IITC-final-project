import { Pencil, Palette, X, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import PositionContent from "./PositionContent";

export type EditElementProps = {
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}

const EditElement = ({ handleEditClick, handleDeleteClick }: EditElementProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-fit flex items-center bg-gray-100 p-2 rounded-lg shadow">
      <button onClick={handleEditClick} className="p-2 mx-1 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded focus:outline-none">
        <Pencil size={18} />
        <span className="font-medium"></span>
      </button>
      <button
        className="p-2 mx-1 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded focus:outline-none"
        data-action="color"
        title="Color"
      >
        <Palette size={18} />
      </button>
      <div className="relative">
        <PositionContent isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <button
        className="p-2 mx-1 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded focus:outline-none"
        data-action="cross"
        title="Cross"
      >
        <X size={18} />
      </button>
      <button
        className="p-2 mx-1 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded focus:outline-none"
        data-action="duplicate"
        title="Duplicate"
      >
        <Copy size={18} />
      </button>
      <button
        onClick={handleDeleteClick}
        className="p-2 mx-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded focus:outline-none"
        data-action="delete"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default EditElement;
