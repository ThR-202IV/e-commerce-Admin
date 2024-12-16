import React from "react";
import { NavLink } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdListAlt } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="w-[10%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-[#7b2cbf] border-r-0 px-3 py-2"
          to="/"
        >
          <MdFormatListBulletedAdd className="text-[23px] text-[#3c096c]" />
          <p className="hidden md:block">Add</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-[#7b2cbf] border-r-0 px-3 py-2"
          to="/list"
        >
          <MdListAlt className="text-[23px] text-[#3c096c]" />
          <p className="hidden md:block">Inventory</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-[#7b2cbf] border-r-0 px-3 py-2"
          to="/orders"
        >
          <TbTruckDelivery className="text-[23px] text-[#3c096c]" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
