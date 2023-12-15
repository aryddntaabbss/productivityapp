import "./style.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../../store/UserSlice";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Modal from "@material-ui/core/Modal";
import { FORGOT_URL } from "../../routes/authCrud";

const EmailVerification = () => {
  const dispatch = useDispatch();
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
    <Grid container className="root">
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
        <div className="paper">
          <Typography component="h1" variant="h3" className="title">
            <p>Forgot Password?</p>
          </Typography>
          <Typography component="h1" variant="h3" className="paragraph">
            <p>
              Don't worry! It occurs. Please enter the email address linked with
              your account.
            </p>
          </Typography>
          <form className="form" noValidate onSubmit={handleSubmit}>
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
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
            >
              <p>Send Code</p>
            </Button>
            <div className="login">
              Remember Password?
              <Link to="/login"> Login</Link>
            </div>
          </form>
          <Modal
            open={showAlert}
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
        </div>
      </Grid>
    </Grid>
  );
};
export default EmailVerification;
