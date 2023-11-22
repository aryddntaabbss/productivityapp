import * as React from "react";
import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../auth/Store/UserSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuProfile = () => {
    setAnchorEl(null); // Close the popover
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      // Dispatch aksi logout
      await dispatch(logoutUser());

      // Hapus item yang benar dari local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      // Navigasi setelah logout selesai
      navigate("/login");
    } catch (error) {
      console.error("Error selama logout:", error);
      // Tangani error jika diperlukan
    }
  };

  const open = Boolean(anchorEl);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <Link className="item" to="/notifokasi">
              <NotificationsNoneOutlinedIcon />
            </Link>
            <div>
              <AccountCircleIcon onClick={handleMenuOpen} />
              <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                id="menu-popover"
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)} // Close the popover
              >
                <div className="account-menu">
                  <MenuItem onClick={handleMenuProfile}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    LogOut
                  </MenuItem>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
