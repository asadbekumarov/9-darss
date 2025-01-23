import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./style.css"

function groupdetail() {
    const {groupID}  = useParams();
    console.log(groupID);
    const [group,setGroup] = useState(null);
    useEffect(()=>{
      (async function(){
        let response = await axios.get("https://nt-shopping-list.onrender.com/api/groups",
          {
            headers: {
              "x-auth-token": ` ${localStorage.getItem("token")}`,
            },
          }
        );
        

        let resgroup =response.data.find((val)=>val._id===groupID)
        setGroup(resgroup)
      })()
    },[])
    console.log(groupID);
    
  return (
    <div>
      {/* <div className='nav_group'>
        <h2>{group?.owner?.name}</h2>
        <div>
          <p>Owner:{group?.owner.name}</p>
          
          <button>add member</button>
          <button>leave group</button>
        </div>
      </div>
      <div></div> */}
     
    </div>
  )
}

export default groupdetail



