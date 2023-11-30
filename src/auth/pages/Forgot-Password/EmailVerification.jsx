import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../../Store/UserSlice";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { FORGOT_URL } from "../../../app/authCrud";

// Style
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
  paragraph: {
    fontSize: "16px",
    // fontWeight: "bold",
    color: "#8391A1",
    textAlign: "left",
    // fontFamily: "Urbanist",
    margin: "20px 70px 30px 90px",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    fontFamily: "Playfair Display",
    margin: "50px 80px 50px 90px",
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
    background: "linear-gradient(to right,  #197391, #0F9EEA)",
    color: "#ffffff",
  },
}));

const EmailVerification = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const forgotPassword = createAsyncThunk(
    "auth/forgot-password",
    async (userCredentials, { dispatch, rejectWithValue }) => {
      try {
        const response = await axios.post(FORGOT_URL, userCredentials);
        const { jwtToken, ...userData } = response.data;

        dispatch(setUser(userData));

        return response.data; // Ubah agar mengembalikan seluruh response
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setAlertSeverity("warning");
      setAlertMessage("Email harus diisi!");
      setShowAlert(true);
      return;
    }

    let userCredentials = {
      email,
    };

    try {
      const result = await dispatch(forgotPassword(userCredentials));

      // Pastikan pengiriman OTP sukses sebelum navigasi
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/otp-Verification");
      } else {
        setAlertSeverity("error");
        setAlertMessage("Email salah!");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error selama forgot password:", error);
      setAlertSeverity("error");
      setAlertMessage("Terjadi kesalahan. Silakan coba lagi nanti.");
      setShowAlert(true);
    }
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" className={classes.title}>
            Forgot Password?
          </Typography>
          <Typography component="h1" variant="h3" className={classes.paragraph}>
            Don't worry! It occurs. Please enter the email address linked with
            your account.
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Send Code
            </Button>
            <div className={classes.login}>
              Remember Password? <Link to="/login">Login</Link>
            </div>
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
export default EmailVerification;
