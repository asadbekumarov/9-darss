import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { IoPerson } from "react-icons/io5";

function Sidebar() {
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
    <div className="w-[300px] min-w-[300px] max-w-[300px] h-screen bg-gray-100 border-r border-gray-300 font-sans flex flex-col p-2.5 overflow-y-auto">
      <div className="mb-5">
        <NavLink
          to={"/main"}
          className="flex items-center text-xl text-black p-2.5"
        >
          <IoPerson className="text-blue-500" />
          Profile
        </NavLink>
      </div>

      <div className="flex flex-col">
        <button
          className="bg-green-500 text-white rounded-md text-base mb-5 py-2 transition duration-300 hover:bg-green-600"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? "Groups" : "+ Create Group"}
        </button>

        {isCreating && (
          <form
            className="w-full flex flex-col gap-2.5 mb-5"
            onSubmit={onCreateGroup}
          >
            <input
              type="text"
              placeholder="Group name"
              className="p-2.5 border border-gray-300 rounded-md text-base w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2.5 border border-gray-300 rounded-md text-base w-full"
              required
            />
            <div className="flex gap-2.5">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2.5 rounded-md transition duration-300 hover:bg-blue-600"
              >
                Create
              </button>
              <button
                type="button"
                className="bg-red-500 text-white p-2.5 rounded-md transition duration-300 hover:bg-red-700"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="w-full">
          {groups.map((group) => (
            <NavLink
              key={group._id}
              to={`/main/groups/${group._id}`}
              className="block p-2.5 bg-white border border-gray-300 rounded-md mb-2.5 text-base transition duration-300 hover:bg-gray-100 hover:border-gray-400 text-black"
            >
              {group.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
