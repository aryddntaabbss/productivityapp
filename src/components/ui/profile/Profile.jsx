import "./profile.scss";
import Navbar from "../../layout/Navbar/Navbar";
import Sidebar from "../../layout/Sidebar/Sidebar";

const Single = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="title">Profile</div>
      </div>
    </div>
  );
};

export default Single;
