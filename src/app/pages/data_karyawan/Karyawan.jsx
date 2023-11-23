import "./karyawan.scss";
import Search from "../../components/search/Search";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Detailkayawan from "../../components/karyawan/Datakaryawan";

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
        <Detailkayawan />
      </div>
    </div>
  );
};

export default List;
