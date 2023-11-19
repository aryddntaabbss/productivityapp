import "./navbar.scss";
import { Link } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <Link className="item" to="/notifokasi">
              <NotificationsNoneOutlinedIcon />
            </Link>
            <Link className="item" to="/profile">
              <AccountCircleIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
