import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./page/Profile/profile";
import Login from "./page/Login/login";
import Register from "./page/Register/register";
import GroupDetail from "./components/GroupDetail/groupdetail";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/main" element={<MainLayout />}>
          <Route path="/main/groups/:groupID" element={<GroupDetail />} />
          <Route path="/main/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;






