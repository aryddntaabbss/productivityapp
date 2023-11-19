import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logo from "../../image/rllogo.png";
import "./sidebar.scss";

const Sidebar = () => {
  const location = useLocation();

  // Fungsi untuk menentukan apakah link aktif
  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={Logo} alt="Radya" />
        </Link>
      </div>
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="title">Dashboard</p>
            <li className={isLinkActive("/") ? "active" : ""}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/data/projek" style={{ textDecoration: "none" }}>
            <p className="title">Reports</p>
            <li className={isLinkActive("/report-projek") ? "active" : ""}>
              <DescriptionIcon className="icon" />
              <span>Projek</span>
            </li>
          </Link>
          <Link to="/data/karyawan" style={{ textDecoration: "none" }}>
            <li className={isLinkActive("/report-karyawan") ? "active" : ""}>
              <ContactPageIcon className="icon" />
              <span>Karyawan</span>
            </li>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li className={isLinkActive("/login") ? "active" : ""}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
