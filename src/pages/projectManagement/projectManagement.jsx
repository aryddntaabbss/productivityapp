import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@material-ui/core/Grid";
import { DASHBOARD_URL } from "../../routes/authCrud";
import { useSelector } from "react-redux";
import Search from "../../components/ui/search/Search";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Navbar from "../../components/layout/Navbar/Navbar";
import "./style/style.scss";

const projectColumns = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "name", headerName: "Nama Projek", width: 250 },
  { field: "status", headerName: "Status", width: 110 },
  { field: "createdAt", headerName: "Dibuat Pada", width: 180 },
  { field: "startDate", headerName: "Tanggal Mulai", width: 180 },
  { field: "endDate", headerName: "Tanggal Selesai", width: 180 },
];

const ProjectManagement = () => {
  const jwtToken = useSelector((state) => state.user.user.data.jwtToken);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getJwtTokenFromLocalStorage = () => jwtToken;

  const fetchProjectRows = async () => {
    try {
      const jwtToken = getJwtTokenFromLocalStorage();

      if (!jwtToken) {
        console.error("jwtToken tidak ditemukan di local storage");
        return [];
      }

      const headers = { Authorization: `Bearer ${jwtToken}` };
      const response = await axios.get(DASHBOARD_URL, { headers });

      const projects = response.data;

      if (!projects || !Array.isArray(projects.data.projects)) {
        console.log("Data proyek : ", projects.data.projects);
        return [];
      }

      const projectRows = projects.data.projects.map((project) => {
        const startDateObject = new Date(project.startDate);
        const endDateObject = new Date(project.endDate);
        const createdDateObject = new Date(project.createdAt);

        return {
          id: project.id,
          name: project.name,
          status: project.status ? "Complete" : "Incomplete",
          createdAt: createdDateObject.toLocaleDateString(),
          startDate: startDateObject.toLocaleDateString(),
          endDate: endDateObject.toLocaleDateString(),
        };
      });
      return projectRows;
    } catch (error) {
      console.error("Error fetching project data:", error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const projectRows = await fetchProjectRows();
      console.log("Test Row : ", projectRows);
      setRows(projectRows);
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = (data) => {
    return data.filter((row) => {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      return (
        (row.name && row.name.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.email && row.email.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.crewrole &&
          row.crewrole.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.productivities !== undefined &&
          row.productivities.toString().includes(normalizedSearchTerm)) ||
        (row.contributions !== undefined &&
          row.contributions.toString().includes(normalizedSearchTerm))
      );
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredRows = filterData(rows);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Grid container spacing={2}>
          {/* Grid item pertama */}
          <Grid item xs={3} md={6}>
            <h1 className="listTitle">List Projek</h1>
          </Grid>

          {/* Grid item kedua */}
          <Grid item xs={3} md={6}>
            <div className="searchCrew">
              <Search onSearch={handleSearch} />
            </div>
          </Grid>
        </Grid>

        <div className="datatable">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div
              style={{
                height: 500,
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
              }}
            >
              <DataGrid
                rows={filteredRows}
                columns={projectColumns}
                pageSize={10}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
