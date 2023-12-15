import axios from "axios";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { DASHBOARD_URL } from "../../routes/authCrud";
import { useSelector } from "react-redux";
import Search from "../../components/ui/search/Search";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Navbar from "../../components/layout/Navbar/Navbar";
import "./style/userManagement.scss";

const userColumns = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "name", headerName: "Nama", width: 220 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "crewrole", headerName: "Role", width: 180 },
  { field: "productivities", headerName: "Productivity", width: 140 },
  { field: "contributions", headerName: "Contribution", width: 140 },
];

const ListUser = () => {
  const jwtToken = useSelector((state) => state.user.user.data.jwtToken);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getJwtTokenFromLocalStorage = () => jwtToken;

  const fetchUserRows = async () => {
    try {
      const jwtToken = getJwtTokenFromLocalStorage();

      if (!jwtToken) {
        console.error("jwtToken tidak ditemukan di local storage");
        return [];
      }

      const headers = { Authorization: `Bearer ${jwtToken}` };
      const response = await axios.get(DASHBOARD_URL, { headers });

      const employees = response.data;

      if (!employees || !Array.isArray(employees.data.employees)) {
        console.log("Data karyawan : ", employees.data.employees);
        return [];
      }

      const employeeRows = employees.data.employees.map((employee) => {
        const productivityPercentage = `${employee.productivity} %`;
        const contributionPercentage = `${employee.contribution} %`;

        return {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          crewrole: employee.role,
          productivities: productivityPercentage,
          contributions: contributionPercentage,
        };
      });

      return employeeRows;
    } catch (error) {
      console.error("Error fetching employee data:", error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const employeeRows = await fetchUserRows();
      setRows(employeeRows);
    } catch (error) {
      console.error("Error fetching employee data:", error);
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
        (row.id && row.id.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.name && row.name.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.email && row.email.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.role && row.role.toLowerCase().includes(normalizedSearchTerm))
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
            <h1 className="listTitle">List Karyawan</h1>
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
                columns={userColumns}
                // pageSize={10}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListUser;
