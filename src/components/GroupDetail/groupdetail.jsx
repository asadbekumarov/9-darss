import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";

function GroupDetail() {
  const { groupID } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [items, setItems] = useState([]);
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
        let resGroup = response.data.find((val) => val._id === groupID);
        if (resGroup) {
          setGroup(resGroup);
          setMembers(resGroup.members);
        } else {
          console.error("Group not found for ID:", groupID);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    })();
  }, [groupID]);

  const createItem = async (e) => {
    e.preventDefault();
    setInputValue("");
    setIsPending(true);
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const delItem = async (id) => {
    setIsPending(true);
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
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <div className="flex items-center p-5 justify-between text-whiter">
        <h2 className="text-2xl font-bold mb-2 text-white">{group?.name}</h2>
        <div className="flex gap-4 items-center">
          <div className="text-center py-2.5 px-2 rounded-xl bg-white">
            <p className=" text-black">
              <strong className="text-black">Owner: </strong>
              {group?.owner?.username}
            </p>
          </div>
          <select className="flex gap-3 py-2.5 px-2 rounded-xl outline-none">
            <option className="text-black px-4 py-3 rounded-sm">
              Add Member
            </option>
            <option className="text-black px-4 py-3 rounded-sm">
              Leave Group
            </option>
          </select>
        </div>
      </div>

      <div className="flex gap-5 m-5">
        <div className="flex-1 bg-white p-5 rounded-lg shadow-md">
          <div className="flex justify-between w-[755px] items-center">
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              Items
              <span className="bg-blue-500 text-white font-bold text-lg px-3 py-1 rounded-md">
                {items.length}
              </span>
            </h3>
            <form className="flex items-center gap-2" onSubmit={createItem}>
              <input
                type="text"
                placeholder="Title"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                {isPending ? "..." : <FiPlus className="text-white text-xl" />}
              </button>
            </form>
          </div>

          <div className="mt-5">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-3 rounded-md border border-gray-200 mb-3"
              >
                <p className="text-gray-700">{item.title}</p>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-2 rounded-md text-white ${
                      item.isBought ? "bg-green-500" : "bg-gray-500"
                    } hover:bg-green-600 transition duration-300`}
                  >
                    <SlBasket />
                  </button>
                  <button
                    onClick={() => delItem(item._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    {isPending ? "..." : <AiOutlineClose />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white w-[735px]  p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">
            Members <span className="font-bold">{members.length}</span>
          </h3>
          <div className="mt-5">
            {members.map((member) => (
              <div key={member._id} className="p-3 rounded-md bg-gray-50 mb-3">
                <p className="text-gray-700">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
