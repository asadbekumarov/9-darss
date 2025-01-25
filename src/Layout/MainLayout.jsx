import React from 'react'
import Navbar from "../components/Navbar/navbar"
import Sidebar from "../components/Sidebar/sidebar"


import { Outlet } from 'react-router-dom'
import "./style.css"
function MainLayout() {
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


