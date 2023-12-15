import React, { useState } from "react";
import "../style/addUser.scss";
import axios from "axios";
import swal from "sweetalert";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

async function AddUser(credentials) {
  try {
    const response = await axios.post(
      "https://protracker.azurewebsites.net/api/auth/register",
      credentials
    );

    if (!response.data.ok) {
      throw new Error("Registrasi gagal");
    }

    return response.data;
  } catch (error) {
    console.error("Error saat mendaftarkan pengguna:", error.message);
    throw error;
  }
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [userRole, setUserRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username) {
      console.error("Email dan username harus diisi");
      return;
    }

    try {
      const response = await AddUser({
        email,
        username,
        userType,
        userRole,
        password,
        confirmPassword,
      });

      if ("accessToken" in response) {
        swal("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("user", JSON.stringify(response.user));
          window.location.href = "/login";
        });
      } else {
        swal("Failed", response.message || "Registrasi gagal.", "error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      swal("Error", "Registrasi gagal. Silakan coba lagi nanti.", "error");
    }
  };

  return (
    <Grid container className="root">
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
        <div className="paper">
          <Typography component="h1" variant="h3" className="paragraph">
            <p>Add User</p>
          </Typography>
          <form className="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={0}>
              <Grid xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FormControl variant="outlined" className="formControl">
                  <InputLabel id="user-type-label">User Type</InputLabel>
                  <Select
                    labelId="user-type-label"
                    id="user-type"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    label="User Type"
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6}>
                <FormControl variant="outlined" className="formControl">
                  <InputLabel id="user-role-label">User Role</InputLabel>
                  <Select
                    labelId="user-role-label"
                    id="user-role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    label="User Type"
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="passwordField"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={() =>
                            handleTogglePasswordVisibility("password")
                          }
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="passwordField"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={() =>
                            handleTogglePasswordVisibility("confirmPassword")
                          }
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="adduser"
            >
              Add User
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
