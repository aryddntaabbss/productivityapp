import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@material-ui/core/Grid";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import { DASHBOARD_USER_URL } from "../../routes/authCrud";
import { useSelector } from "react-redux";
import Search from "../../components/ui/search/Search";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Navbar from "../../components/layout/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./style/userManagement.scss";

const userColumns = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "name", headerName: "Nama", width: 250 },
  { field: "email", headerName: "Email", width: 260 },
  { field: "usertype", headerName: "User Type", width: 200 },
];

const UserManagement = () => {
  const jwtToken = useSelector((state) => state.user.user.data.jwtToken);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const navigateToAddUser = () => {
    navigate("/add");
  };

  const handleEdit = (id) => () => {
    setRows({ ...rows, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDelete = (id) => {
    setRows(rows.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              <EditIcon />
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  const getJwtTokenFromLocalStorage = () => jwtToken;

  const fetchUserRows = async () => {
    try {
      const jwtToken = getJwtTokenFromLocalStorage();

      if (!jwtToken) {
        console.error("jwtToken tidak ditemukan di local storage");
        return [];
      }

      const headers = { Authorization: `Bearer ${jwtToken}` };
      const response = await axios.get(DASHBOARD_USER_URL, { headers });

      const employees = response.data;

      if (!employees || !Array.isArray(employees.data)) {
        console.log("Data karyawan : ", employees.data);
        return [];
      }

      const employeeRows = employees.data.map((employee) => ({
        id: employee.id,
        name: employee.userName,
        email: employee.email,
        usertype: employee.userType,
      }));

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
        (row.name && row.name.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.email && row.email.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.crewrole &&
          row.crewrole.toLowerCase().includes(normalizedSearchTerm)) ||
        (row.userType &&
          row.userType.toLowerCase().includes(normalizedSearchTerm))
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
          <Grid item xs={3} md={5}>
            <h1 className="listTitle">Manajemen User</h1>
          </Grid>
          <Grid item xs={3} md={5}>
            <div className="searchCrew">
              <Search onSearch={handleSearch} />
            </div>
          </Grid>
          <Grid item xs={3} md={2}>
            <div className="head">
              <Button
                variant="contained"
                onClick={navigateToAddUser}
                className="addBtn"
              >
                add
              </Button>
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
                columns={userColumns.concat(actionColumn)}
                // pageSize={10}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
