import "./dashboard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";

const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1 className="listTitle">Welcome to Dashboard!</h1>
        <div className="widgets">
          <Widget type="karyawan" />
          <Widget type="semuaproject" />
          <Widget type="projectberjalan" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
