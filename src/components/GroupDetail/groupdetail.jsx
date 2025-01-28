import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import "./style.css";
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
        console.log("API Response:", response.data);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          maxWidth: "400px",
          margin: "20px auto",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ marginBottom: "10px" }}>
          {group?.name}
        </Typography>
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Typography variant="body1">
            <strong>Owner:</strong> {group?.owner?.username}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" color="primary">
            Add Member
          </Button>
          <Button variant="outlined" color="secondary">
            Leave Group
          </Button>
        </Box>
      </Box>
      <div style={{ display: "flex", margin: "20px", gap: "20px" }}>
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            color: "black",
            width: "600px",
          }}
          className="items_wrap"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ display: "flex", gap: "10px" }}>
              Items{" "}
              <span
                style={{
                  display: "flex",
                  fontWeight: "bold",
                  backgroundColor: "blue",
                  color: "white",
                  fontSize: "18px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                {items.length}
              </span>
            </h3>
            <form
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              onSubmit={createItem}
            >
              <input
                type="text"
                placeholder="Title"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {isPending ? (
                  "..."
                ) : (
                  <FiPlus style={{ color: "white", fontSize: "20px" }} />
                )}
              </button>
            </form>
          </div>

          <div className="items" style={{ marginTop: "20px" }}>
            {items.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <p>{item.title}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{
                      backgroundColor: item.isBought ? "green" : "gray",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <SlBasket />
                  </button>
                  <button
                    onClick={() => delItem(item._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {isPending ? "..." : <AiOutlineClose />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            color: "black",
          }}
          className="members_wrap"
        >
          <h3>
            Members <span style={{ fontWeight: "bold" }}>{members.length}</span>
          </h3>
          <div className="members" style={{ marginTop: "20px" }}>
            {members.map((member) => (
              <div
                key={member._id}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  marginBottom: "10px",
                  width: "800px",
                }}
              >
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
