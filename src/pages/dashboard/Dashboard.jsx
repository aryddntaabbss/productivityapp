import "./dashboard.scss";
import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Navbar from "../../components/layout/Navbar/Navbar";
import Widget from "../../components/ui/widget/Widget";

const Dashboard = () => {
  const userType = useSelector((state) => state.user.userType);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1 className="listTitle">Welcome to {userType}, Dashboard !</h1>
        <div className="widgets">
          <Widget type="karyawan" />
          <Widget type="totalproject" />
          <Widget type="projectberjalan" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
