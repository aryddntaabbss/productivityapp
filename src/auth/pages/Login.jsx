import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
import customAvatarImage from "../../app/components/assets/image/rllogo.png";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser, setAuthToken, setUser } from "../Store/UserSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
    height: "100vh",
  },

  paper: {
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: "10px",
  },
  iconContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    width: "200px",
    height: "100px",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  paragraph: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    fontFamily: "Playfair Display",
    margin: "20px 50px 30px 50px",
    "& a": {
      textDecoration: "none",
      fontSize: "30px",
      fontWeight: "bold",
      color: "#0F9EEA",
      fontFamily: "Playfair Display",
    },
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    fontFamily: "Playfair Display",
    margin: "0 50px 0 50px",
  },
  form: {
    width: "70%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  passwordField: {
    width: "100%",
  },
  forgot: {
    fontSize: "14px",
    color: "#000",
    "& a": {
      textAlign: "right",
      textDecoration: "none",
      color: "#0F9EEA",
      fontWeight: "bold",
    },
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  submit: {
    height: "50px",
    margin: "15px 0",
    fontWeight: "bold",
    background: "linear-gradient(to right,  #197391, #0F9EEA)",
    color: "#ffffff",
  },
}));

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

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

    if (!email || !password) {
      setAlertSeverity("warning");
      setAlertMessage("Email dan Password harus diisi!");
      setShowAlert(true);
      return;
    }

    let userCredentials = {
      email,
      password,
    };

    try {
      const result = await dispatch(loginUser(userCredentials));

      if (result.payload) {
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
        handleOpenModal();
      }
    } catch (error) {
      console.error("Error selama login:", error);
      setAlertSeverity("error");
      setAlertMessage("Terjadi kesalahan. Silakan coba lagi nanti.");
      setShowAlert(true);
      handleOpenModal();
    }
  };

  const classes = useStyles();

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
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid
        className={classes.card}
        item
        xs={12}
        md={4}
        component={Paper}
        elevation={6}
      >
        <div className={classes.paper}>
          <div className={classes.iconContainer}>
            <div className={classes.icon}>
              <img src={customAvatarImage} alt="Avatar" />
            </div>
          </div>
          <Typography component="h1" variant="h3" className={classes.paragraph}>
            Welcome back to <a href="/login">Productivity Tracker App</a>
          </Typography>
          <Typography component="h1" variant="h3" className={classes.title}>
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
              className={classes.passwordField}
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
            <div className={classes.forgot}>
              <a href="/email-verification">Forgot Password?</a>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
          {showAlert && (
            <Modal
              open={true}
              onClose={() => setShowAlert(false)}
              className={classes.modal}
            >
              <div className={classes.modal}>
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
