import React from 'react'
import Navbar from "../components/Navbar/navbar"
import Sidebar from "../components/Sidebar/sidebar"


import { Outlet } from 'react-router-dom'
import "./style.css"
function MainLayout() {
  //    if (!localStorage.getItem ("token")) {
  //   return <Navigate to={"/login"}/>
  // }
  return (
    <div>
      <Navbar/>
      <div className='main_wrapper'>
      <Sidebar/>
      <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout


