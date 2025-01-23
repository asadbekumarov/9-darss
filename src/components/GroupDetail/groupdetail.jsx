import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./style.css"
import { Box, Button, Typography } from '@mui/material';


function groupdetail() {
    const {groupID}  = useParams();
    console.log(groupID);
    const [group,setGroup] = useState(null);
    useEffect(() => {
      (async function() {
        try {
          let response = await axios.get("https://nt-shopping-list.onrender.com/api/groups", {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          });
          console.log("API Response:", response.data);
    
          let resgroup = response.data.find((val) => val._id === groupID);
          if (resgroup) {
            setGroup(resgroup);
          } else {
            console.error("Group not found for ID:", groupID);
          }
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      })();
    }, [groupID]);
    
    console.log(groupID);

  return (
    <div>
       <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" component="h2" sx={{ marginBottom: '10px' }}>
        {group?.name}
      </Typography>
      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography variant="body1">
          <strong>Owner:</strong> {group?.owner?.username}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button variant="contained" color="primary">
          Add Member
        </Button>
        <Button variant="outlined" color="secondary">
          Leave Group
        </Button>
      </Box>
    </Box>
     
    </div>
  )
}

export default groupdetail





