import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { DASHBOARD_URL } from "../../routes/ApiBase";
import { useSelector } from "react-redux";
import Search from "../../components/ui/search/Search";
import MainLayout from "../../components/layout/Layout/MainLayout";

const userColumns = [
  { field: "id", headerName: "ID", width: 110 },
  { field: "name", headerName: "Nama", width: 220 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "crewRole", headerName: "Role", width: 180 },
  {
    field: "productivities",
    headerName: "Productivity",
    width: 140,
    type: "number",
  },
  {
    field: "contributions",
    headerName: "Contribution",
    width: 140,
    type: "number",
  },
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
        return {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          crewRole: employee.role,
          productivities: employee.productivity,
          contributions: employee.contribution,
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

      // Konversi nilai persentase menjadi angka
      const productivityValue = parseFloat(row.productivities);
      const contributionValue = parseFloat(row.contributions);

      // Perbandingan dengan nilai numerik
      return (
        (row.id && row.id.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.name && row.name.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.email && row.email.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.crewRole &&
          row.crewRole.toLowerCase().includes(normalizedSearchTerm)) ||
        (!isNaN(productivityValue) && productivityValue === 100) ||
        (!isNaN(contributionValue) && contributionValue === 100)
      );
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredRows = filterData(rows);

  return (
    <MainLayout>
      <div className="homeContainer">
        <Grid container spacing={2}>
          <Grid item xs={3} md={6}>
            <h1 className="listTitle">List Karyawan</h1>
          </Grid>
          <Grid item xs={3} md={6}>
            <div className="searchCrew">
              <Search onSearch={handleSearch} />
            </div>
          </Grid>
        </Grid>
        <div className="datatable">
          {loading ? (
            <div style={{ height: 480, width: "100%" }}>
              <Skeleton variant="rounded" height={500} animation="wave" />
            </div>
          ) : (
            <div
              style={{
                height: 480,
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
              }}
            >
              <DataGrid rows={filteredRows} columns={userColumns} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ListUser;
