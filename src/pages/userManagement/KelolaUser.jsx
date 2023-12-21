import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@material-ui/core/Grid";
import swal from "sweetalert";
import { DataGrid } from "@mui/x-data-grid";
import { DASHBOARD_USER_URL, DELETE_USER_URL } from "../../routes/ApiBase";
import { useSelector } from "react-redux";
import Search from "../../components/ui/search/Search";
import MainLayout from "../../components/layout/Layout/MainLayout";
import { useNavigate } from "react-router-dom";

const userColumns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "name", headerName: "Nama", width: 280 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "usertype", headerName: "User Type", width: 200 },
];

const UserManagement = () => {
  const jwtToken = useSelector((state) => state.user.user.data.jwtToken);
  const [rows, setRows] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const navigateToAddUser = () => {
    navigate("/add");
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.name)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  const fetchUserRows = async () => {
    try {
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
      console.log("data : ", employees.data);

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
      setShowSkeleton(false);
      setTimeout(() => {
        setShowSkeleton(false);
      }, 160000);
    }
  };

  const handleDelete = async (userName) => {
    try {
      const shouldDelete = await swal({
        title: "Are you sure?",
        text: `Do you really want to delete the user ${userName}?`,
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      });

      if (!shouldDelete) {
        return;
      }

      const response = await axios.delete(DELETE_USER_URL, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          name: `${userName}`,
        },
      });

      if (response.data.code === 200) {
        setRows(rows.filter((item) => item.name !== userName));
        swal("Success", "User successfully deleted.", "success");
      } else {
        swal("Error", response.data || "Failed to delete user.", "error");
      }
    } catch (error) {
      console.error("Error during user deletion:", error);
      swal("Error", "Failed to delete user. Please try again later.", "error");
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
    <MainLayout>
      <div className="homeContainer">
        <Grid container spacing={2}>
          <Grid item xs={3} md={5}>
            <h1 className="listTitle">Kelola User</h1>
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
          {showSkeleton ? (
            <div style={{ height: 480, width: "100%" }}>
              <Skeleton variant="rounded" height={480} animation="wave" />
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
              <DataGrid
                rows={filteredRows}
                columns={userColumns.concat(actionColumn)}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
