import "./project.scss";
import Search from "../../components/search/Search";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h1 className="listTitle">List Projek</h1>
        <div className="searchCrew">
          <Search />
        </div>
        <Datatable />
      </div>
    </div>
  );
};

export default List;
