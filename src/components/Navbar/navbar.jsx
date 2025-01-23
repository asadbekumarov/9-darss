import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

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
            "Content-Type":"applocation/json"
          },
          params:{
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
          <h1>Logo</h1>
          <button>+New</button>
        </div>
        <input
          type="text"
          onChange={onChange}
          placeholder="search group and join"
        />
        <div>
          <button>@</button>
          <button>&</button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            ⚙
          </button>
        </div>
      </div>
    
    </>
  );
}
export default Navbar;
  


