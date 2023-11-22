import "./manajemen.scss";
import Search from "../../modules/components/search/Search";
import Sidebar from "../../modules/components/sidebar/Sidebar";
import Navbar from "../../modules/components/navbar/Navbar";
import Datakaryawan from "../../modules/components/karyawan/Datakaryawan";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h1 className="listTitle">List Karyawan</h1>
        <div className="searchCrew">
          <Search />
        </div>
        <Datakaryawan />
      </div>
    </div>
  );
};

export default List;
