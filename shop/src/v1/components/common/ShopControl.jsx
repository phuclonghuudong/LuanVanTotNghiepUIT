import { FiCheckCircle, FiFilter } from "react-icons/fi";
import IconComponent from "../ui/IconComponent";

const ShopControl = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-4">
          <button className="flex items-center gap-4 border rounded px-4 py-2 text-sm cursor-pointer">
            <FiFilter />
            <span className="font-bold">Filters</span>
          </button>
          <div className=" items-center gap-1 hidden lg:flex">
            <IconComponent icon={FiCheckCircle} className="text-sm" size={24} />
            <p className="text-sm">Shop sale items only</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 ">
            <span className="text-xs font-mono">2</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 ">
            <span className="text-xs font-mono">4</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <p className="hidden lg:block text-sm">Sort by:</p>
          <select className="border rounded px-4 py-2 text-sm">
            <option>Best selling</option>
            <option>Alphabetically, A-Z</option>
            <option>Alphabetically, Z-A</option>
            <option>Price, low to high</option>
            <option>Price, high to low</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ShopControl;
