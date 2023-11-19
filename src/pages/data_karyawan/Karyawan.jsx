import "./karyawan.scss";
import Search from "../../components/search/Search";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datakaryawan from "../../components/karyawan/Datakaryawan";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h1 className="listTitle">Karyawan</h1>
        <div className="searchCrew">
          <Search />
        </div>
        <Datakaryawan />
      </div>
    </div>
  );
};

export default List;
