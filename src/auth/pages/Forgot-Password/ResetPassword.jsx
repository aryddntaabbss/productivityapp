import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Store/UserSlice";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Modal from "@material-ui/core/Modal";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
    height: "100vh",
  },
  paper: {
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: "10px",
  },
  paragraph: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#8391A1",
    textAlign: "left",
    margin: "20px 60px 30px 80px",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    fontFamily: "Playfair Display",
    margin: "50px 80px 50px 80px",
  },
  form: {
    width: "70%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  login: {
    margin: "20px 50px 50px 50px",
    fontSize: "14px",
    color: "#000",
    "& a": {
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
    margin: "35px 0",
    fontWeight: "bold",
    background: "linear-gradient(to right, #197391, #0F9EEA)",
    color: "#ffffff",
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const resetPasswordStatus = useSelector(
    (state) => state.user.resetPasswordStatus
  );

  const email = useSelector((state) => state.user.user.data.email); // Ambil email dari state Redux
  const token = useSelector((state) => state.user.user.data.token); // Ambil token dari state Redux

  const handleTogglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowAlert(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertSeverity("error");
      setAlertMessage("Password dan Confirm Password harus sama!");
      setShowAlert(true);
      handleOpenModal();
      return;
    }

    try {
      // Lakukan dispatch ke thunk resetPassword dengan menyertakan data yang diperlukan
      const response = await dispatch(
        resetPassword({
          email: email,
          token: token,
          newPassword: password,
          confirmPassword: confirmPassword,
        })
      );

      // Periksa status resetPassword dari store Redux
      if (resetPasswordStatus === "fulfilled") {
        // Reset password berhasil, navigasi ke halaman login
        navigate("/success");
      } else {
        // Handle kasus lain, misalnya, tampilkan pesan kesalahan dari server
        setAlertSeverity("error");
        setAlertMessage(
          response.payload.message || "Reset password gagal. Silakan coba lagi."
        );
        setShowAlert(true);
        handleOpenModal();
      }
    } catch (error) {
      // Handle kesalahan lain, misalnya, tampilkan pesan kesalahan umum
      setAlertSeverity("error");
      setAlertMessage("Terjadi kesalahan. Silakan coba lagi nanti.");
      setShowAlert(true);
      handleOpenModal();
    }
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" className={classes.title}>
            Create new password
          </Typography>
          <Typography component="h1" variant="h3" className={classes.paragraph}>
            Your new password must be unique from those previously used.
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                      onClick={() => handleTogglePasswordVisibility("password")}
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
              className={classes.passwordField}
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
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Reset Password
            </Button>
          </form>
          <Modal
            open={showAlert}
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
        </div>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
