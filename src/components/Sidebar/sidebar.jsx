import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";

function sidebar() {
  const [groups, setGroups] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          "https://nt-shopping-list.onrender.com/api/groups",
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    })();
  }, []);

  const onCreateGroup = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/groups",
        {
          name: e.target[0].value,
          password: e.target[1].value,
        },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Group created successfully!");
        setGroups([...groups, response.data.group]);
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Unfortunately, the group could not be created.");
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <NavLink to={"/main"} className="sidebar-profile-link">
          Profile
        </NavLink>
      </div>

      <div className="sidebar-content">
        <button
          className="create-group-toggle-btn"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? "groups" : "Create Group"}
        </button>

        {isCreating && (
          <form className="create-group-form" onSubmit={onCreateGroup}>
            <input
              type="text"
              placeholder="Group name"
              className="form-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              required
            />
            <div className="form-actions">
              <button type="submit" className="form-submit-btn">
                Create
              </button>
              <button
                type="button"
                className="form-cancel-btn"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="group-list">
          {groups.map((group) => (
            <NavLink
              key={group._id}
              to={`/main/groups/${group._id}`}
              className="group-link"
            >
              {group.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default sidebar;




