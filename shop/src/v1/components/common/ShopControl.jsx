import { FiCheckCircle, FiFilter } from "react-icons/fi";
import IconComponent from "../ui/IconComponent";
import ButtonComponent from "../ui/ButtonComponent";

const ShopControl = () => {
  return (
    <>
      <div data-aos="fade-up" className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-4">
          <ButtonComponent
            icon={FiFilter}
            title="Filters"
            color="transparent"
            rounded="sm"
            className="font-semibold gap-4"
          />
          <div className=" items-center gap-1 hidden lg:flex">
            <IconComponent icon={FiCheckCircle} className="text-sm" size={24} />
            <p className="text-sm">Shop sale items only</p>
          </div>
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
