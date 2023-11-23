import "./manajemen.scss";
import Search from "../../components/search/Search";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datauser from "../../components/manajemen/Manajemen";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h1 className="listTitle">Manajemen User</h1>
        <div className="searchCrew">
          <Search />
        </div>
        <Datauser />
      </div>
    </div>
  );
};

export default List;
