import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Navbar from "../../components/layout/Navbar/Navbar";
import AddUser from "../userManagement/detail/AddUser";

const Add = () => {
  const userType = useSelector((state) => state.user.userType);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1 className="listTitle">Add User</h1>
        <div className="card">{userType === "Admin" && <AddUser />}</div>
      </div>
    </div>
  );
};

export default Add;
