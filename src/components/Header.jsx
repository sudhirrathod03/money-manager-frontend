import React from "react";
import { FaWallet, FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-green-600 p-2 rounded-lg text-white shadow-md shadow-blue-200">
            <FaWallet />
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">
            Money<span className="text-green-600">Mint</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-blue-600 transition duration-200">
            <FaBell className="text-lg" />
            <span className="absolute top-1.5 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-700 leading-tight">
                Test User
              </p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                Premium Member
              </p>
            </div>
            <FaUserCircle className="text-3xl text-slate-300" />
          </div>

          <button
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors duration-300 text-sm font-medium"
            title="Logout"
          >
            <FaSignOutAlt className="text-lg" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
