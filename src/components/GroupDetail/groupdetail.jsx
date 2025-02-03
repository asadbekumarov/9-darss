import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import ModalAddMember from "../modalAddMember/ModalAddMember";

function GroupDetail() {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }

  const { groupID } = useParams();
  const [group, setGroup] = useState(null);
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [me, setMe] = useState(null);
  const [bought, setBought] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          "https://nt-shopping-list.onrender.com/api/groups",
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          }
        );

        let resMe = await axios.get(
          "https://nt-shopping-list.onrender.com/api/auth",
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          }
        );

        let resGroup = response.data.find((val) => val._id === groupID);
        if (resGroup) {
          setGroup(resGroup);
          setMe(resMe.data);
          setItems(resGroup.items);
          setMembers(resGroup.members);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [groupID, bought]);

  const createItem = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const groupId = groupID;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/items",
        { title, groupId },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      setItems((prevItems) => [...prevItems, response.data.item]);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const delItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/items/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setItems((prevItems) => prevItems.filter((val) => val._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const asBought = async (itemId) => {
    try {
      let res = await axios.post(
        `https://nt-shopping-list.onrender.com/api/items/${itemId}/mark-as-bought`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setBought(!bought);
    } catch (error) {
      console.error(error);
    }
  };

  const asNotBought = async (itemId) => {
    try {
      let res = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/items/${itemId}/mark-as-bought`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setBought(!bought);
    } catch (error) {
      console.error(error);
    }
  };

  const removeMember = async (groupId, memberId) => {
    if (!groupId || !memberId) {
      console.log("xato");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token");
      return;
    }

    try {
      const response = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/members/${memberId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log("Member removed:", response.data);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== memberId)
      );
    } catch (error) {
      console.error("xato:", error.response?.data || error.message);
    }
  };

  const LeaveGroup = async () => {
    try {
      let res = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${groupID}/leave`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("Group left:", res);
    } catch (error) {
      console.error("xato:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-5 min-h-screen">
      <div className="mx-auto p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{group?.name}</h2>
          <div className="flex justify-between items-center gap-4">
            <div className="px-4 py-2 rounded-lg">
              <p className="text-black p-1 rounded-md bg-white">
                <strong className="text-black">Owner:</strong>{" "}
                {group?.owner?.username}
              </p>
            </div>
            <select
              className="px-4 py-2 rounded-lg bg-gray-200 outline-none"
              onChange={(e) => {
                if (e.target.value === "Add Member") {
                  setIsAddMemberModalOpen(true);
                } else if (e.target.value === "Leave Group") {
                  LeaveGroup();
                }
              }}
            >
              <option value="">Select an option</option>
              <option value="Add Member">Add Member</option>
              <option value="Leave Group">Leave Group</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex gap-6">
        {isAddMemberModalOpen && (
          <ModalAddMember
            setIsAddMemberModalOpen={setIsAddMemberModalOpen}
            groupId={groupID}
            setMembers={setMembers}
          />
        )}
        <div className="flex-1 bg-white w-[755px] p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Items{" "}
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md">
                {items.length}
              </span>
            </h3>
            <form onSubmit={createItem} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add new item"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                +
              </button>
            </form>
          </div>

          <div className="mt-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-3"
              >
                <p className="text-gray-700">{item.title}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      item.isBought ? asNotBought(item._id) : asBought(item._id)
                    }
                    className={`px-3 py-2 rounded-md text-white ${item.isBought ? "bg-green-500" : "bg-red-500"} hover:bg-green-600 transition duration-300`}
                  >
                    {item.isBought ? "Bought" : "Buy"}
                  </button>
                  {me?._id === group?.owner?._id && (
                    <button
                      onClick={() => delItem(item._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Del
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            Members{" "}
            <span className="bg-blue-500 text-white px-2 py-1 rounded-md">
              {members.length}
            </span>
          </h3>
          <div className="w-[735px] mt-6">
            {members.map((member) => (
              <div
                key={member._id}
                className="p-4 bg-gray-50 rounded-lg mb-3 flex justify-between items-center"
              >
                <p className="text-gray-700">{member.username}</p>
                {group?.owner?._id === me?._id && member._id !== me?._id && (
                  <button
                    onClick={() => removeMember(groupID, member._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Del
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
