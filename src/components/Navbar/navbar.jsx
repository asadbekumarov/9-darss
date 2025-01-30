import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import Logo from "../../assets/img/logo-Photoroom.png";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onChange = async (e) => {
    setSearch(e.target.value);
    try {
      await axios.get(
        `https://nt-shopping-list.onrender.com/api/groups/search`,
        {
          headers: {
            "x-auth-token": ` ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          params: {
            q: search,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 shadow-md rounded-md px-4 py-2">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-700">
          +New
        </button>
      </div>
      <input
        type="text"
        onChange={onChange}
        placeholder="Search group and join"
        className="px-3 py-2 border w-[900px] border-gray-300 rounded-lg text-sm outline-none"
      />
      <div className="flex items-center gap-3">
        <button className="text-gray-600 hover:text-blue-500 text-lg">
          <LuRefreshCw />
        </button>
        <button className="relative text-gray-600 hover:text-blue-500 text-lg">
          <FaRegBell />
          <span className="absolute -top-4 -right-5 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
            9+
          </span>
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex items-center gap-1 text-gray-600 hover:text-blue-500 text-lg"
        >
          <IoSettingsSharp />
          <IoMdArrowDropdown />
        </button>
      </div>
    </div>
  );
}
export default Navbar;
