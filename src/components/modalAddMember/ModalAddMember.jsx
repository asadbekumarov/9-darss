import axios from "axios";
import React, { useState } from "react";

function ModalAddMember({ groupId, setIsAddMemberModalOpen, setMembers }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nt-shopping-list.onrender.com/api/users/search?q=${query}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const addMember = async (userId) => {
    if (!groupId || !userId) {
      console.error("Group ID or User ID is undefined");
      return;
    }

    try {
      const response = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/members`,
        { memberId: userId },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setMembers((prevMembers) => [...prevMembers, response.data]);
      setIsAddMemberModalOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-4">Add Member</h1>
          <button
            onClick={() => setIsAddMemberModalOpen(false)}
            className="w-[100px] bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Close
          </button>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-4"
        />
        <div className="max-h-48 overflow-y-auto">
          {searchResults.map((user) => (
            <div
              key={user._id}
              onClick={() => addMember(user._id)}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              <p className="text-gray-700">{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalAddMember;
