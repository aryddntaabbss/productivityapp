import axios from "axios";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid from MUI
import { DASHBOARD_URL } from "../../routes/ApiBase";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Widget from "../../components/ui/widget/Widget";
import { useNavigate } from "react-router-dom";
import MainLayout from "./../../components/layout/Layout/MainLayout";

const userColumns = [
  { field: "id", headerName: "ID", width: 120 },
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

const Dashboard = () => {
  const userData = useSelector((state) => state.user.user.data);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getJwtToken = () => userData.jwtToken;

  const navigateToAddUser = () => {
    navigate("/data/karyawan");
  };

  const fetchUserRows = async () => {
    try {
      const jwtToken = getJwtToken();

      if (!jwtToken) {
        console.error("jwtToken tidak ditemukan di local storage");
        return [];
      }

      const headers = { Authorization: `Bearer ${jwtToken}` };
      const response = await axios.get(DASHBOARD_URL, { headers });

      const topEmployes = response.data;

      if (
        !topEmployes ||
        !Array.isArray(topEmployes.data.dashboard.topEmployees)
      ) {
        console.log("Top 5 : ", topEmployes.data.dashboard.topEmployees);
        return [];
      }

      const employeeRows = topEmployes.data.dashboard.topEmployees.map(
        (employee) => {
          return {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            crewRole: employee.role,
            productivities: employee.productivity,
            contributions: employee.contribution,
          };
        }
      );

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

  return (
    <MainLayout>
      <div className="homeContainer">
        <h1 className="listTitle">
          Welcome to {userData.userType}, Dashboard!
        </h1>
        <div className="widgets">
          <Widget type="karyawan" />
          <Widget type="project" />
          <Widget type="ratarata" />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3} md={6}>
            <h2 className="titleHead">Top 5 Productivity</h2>
          </Grid>
          <Grid item xs={3} md={6}>
            <div className="heads">
              <Button
                variant="contained"
                onClick={navigateToAddUser}
                className="viewlink"
              >
                View More
              </Button>
            </div>
          </Grid>
        </Grid>
        <div className="datatable">
          {loading ? (
            <div style={{ height: 370, width: "100%" }}>
              <Skeleton variant="rounded" height={370} animation="wave" />
            </div>
          ) : (
            <div
              style={{
                height: 371,
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
              }}
            >
              <DataGrid rows={rows} columns={userColumns} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
