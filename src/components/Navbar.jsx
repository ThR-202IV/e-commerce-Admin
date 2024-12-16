import React from "react";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      {/* <img className="w-[max(10%,100px)]" src={assets.logo} alt="" /> */}
      <p className="delius-swash-caps-regular text-[25px] font-bold">
        Threaded
      </p>
      <button
        onClick={() => setToken("")}
        className="border border-[#9d4edd] text-[#581c88] px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm hover:bg-[#f8edff]"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
