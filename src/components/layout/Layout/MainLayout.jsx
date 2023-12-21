import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../../../style/layoutStyle.scss";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="flex-container">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
