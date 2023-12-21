import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/UserSlice";
import customAvatarImage from "../../../assets/rllogo.png";

export default function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userType = useSelector((state) => state.user.userType);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());

      localStorage.clear();

      navigate("/login");
    } catch (error) {
      console.error("Error selama logout:", error);
    }
  };

  const menuId = "menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar className="navbar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div>
              <img src={customAvatarImage} alt="Avatar" />
            </div>
          </Link>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" component="h6" className="usertype">
          {userType}
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleMenuClose}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMenu}
    </Box>
  );
}
