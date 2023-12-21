import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MainLayout from "../../components/layout/Layout/MainLayout";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/UserSlice";

export default function Adduser() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
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
      await dispatch(
        addUser({
          email,
          username,
          userType,
          password,
          confirmPassword,
        })
      );
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <MainLayout>
      <div className="homeContainer">
        <Grid container>
          <h1 className="listTitle">Add User</h1>

          <div className="card">
            <form className="forms" noValidate onSubmit={handleSubmit}>
              <div className="form-card">
                <Grid container spacing={0}>
                  <Grid xs={6} md={5} className="form1">
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
                        margin="normal"
                        id="user-type"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        label="User Type"
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Project Manager">
                          Project Manager
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={6} md={5} className="form2">
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
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
                                handleTogglePasswordVisibility(
                                  "confirmPassword"
                                )
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

                <div className="button">
                  <Button type="submit" fullWidth className="addBtn">
                    <p>Add User</p>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Grid>
      </div>
    </MainLayout>
  );
}
