import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
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
      let response = await axios.get(
        `https://nt-shopping-list.onrender.com/api/groups/search`,
        {
          headers: {
            "x-auth-token": ` ${localStorage.getItem("token")}`,
            "Content-Type": "applocation/json",
          },
          params: {
            q: search,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <button>+New</button>
        </div>
        <input
          type="text"
          onChange={onChange}
          placeholder="search group and join"
        />
        <div className="btn">
          <button>
            <LuRefreshCw />
          </button>
          <button>
            <FaRegBell />
            <p className="num">9+</p>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <IoSettingsSharp />
            <IoMdArrowDropdown />
          </button>
        </div>
      </div>
    </>
  );
}
export default Navbar;
