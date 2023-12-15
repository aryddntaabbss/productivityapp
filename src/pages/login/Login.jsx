import "./style.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import customAvatarImage from "../../assets/rllogo.png";
import { loginUser, setAuthToken, setUser } from "../../store/UserSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [alertMessage, setAlertMessage] = useState("");
  const [setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector((state) => state.user.loading);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setAlertSeverity("warning");
      setAlertMessage("Email harus diisi!");
      setShowAlert(true);
      return;
    } else if (!password) {
      setAlertSeverity("warning");
      setAlertMessage(" Password harus diisi!");
      setShowAlert(true);
      return;
    }

    let userCredentials = {
      email,
      password,
    };

    try {
      const result = await dispatch(loginUser(userCredentials));

      if (result.payload && typeof result.payload === "object") {
        localStorage.setItem("userData", JSON.stringify(result.payload));
      } else {
        setAlertSeverity("error");

        if (result.error && result.error.message === "User not found") {
          setAlertMessage(
            "Akun tidak ditemukan. Silakan cek kembali email dan password Anda."
          );
        } else {
          setAlertMessage("Email atau password salah!");
        }

        setShowAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        handleOpenModal();
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Terjadi kesalahan. Silakan coba lagi nanti.");
      setShowAlert(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      handleOpenModal();
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(setUser(parsedUserData));
      dispatch(setAuthToken(parsedUserData.jwtToken));
    }

    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, dispatch]);

  return (
    <Grid container className="root">
      <CssBaseline />
      <Grid
        className="card"
        item
        xs={12}
        md={4}
        component={Paper}
        elevation={6}
      >
        <div className="paper">
          <div className="iconContainer">
            <div className="icon">
              <img src={customAvatarImage} alt="Avatar" />
            </div>
          </div>
          <div className="paragraph">
            <h3>Welcome back to </h3>
            <a href="/login">Productivity Tracker App</a>
          </div>
          <div className="title">
            <h3>Login</h3>
          </div>
          <form className="form" noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="forgot">
              <a href="/email-verification">Forgot Password?</a>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
            >
              <p>login</p>
            </Button>
            <br />
          </form>
          {showAlert && (
            <Modal
              open={true}
              onClose={() => setShowAlert(false)}
              className="modal"
            >
              <div className="modal">
                <Alert
                  severity={alertSeverity}
                  onClose={() => setShowAlert(false)}
                >
                  <AlertTitle>
                    {alertSeverity === "warning" ? "Peringatan" : "Error"}
                  </AlertTitle>
                  {alertMessage}
                </Alert>
              </div>
            </Modal>
          )}

          {isLoading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
