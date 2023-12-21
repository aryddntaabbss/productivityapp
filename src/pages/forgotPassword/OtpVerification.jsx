import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { selectToken } from "../../store/UserSlice";

export const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [alertMessage, setAlertMessage] = useState("");
  const [setOpen] = useState(false);

  const navigate = useNavigate();
  const token = useSelector(selectToken);
  console.log("Token from Redux:", token);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setAlertSeverity("warning");
      setAlertMessage("Otp harus diisi!");
      setShowAlert(true);
      return;
    }

    // Check if entered OTP matches the token in the Redux store
    if (otp === token) {
      // OTP is correct, navigate to the reset password page
      navigate("/reset-password");
    } else {
      // OTP is incorrect, show an error message
      setAlertSeverity("error");
      setAlertMessage("OTP salah!");
      setShowAlert(true);
      handleOpenModal();
    }
  };

  return (
    <Grid container className="root">
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
        <div className="paper">
          <Typography component="h1" variant="h3" className="title">
            <p>OTP Verification</p>
          </Typography>
          <Typography component="h1" variant="h3" className="paragraph">
            <p>Enter the verification code we just send on your OTP address.</p>
          </Typography>
          <form className="form" noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="otp"
              name="otp"
              label="Enter your code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
            >
              <p>Verify</p>
            </Button>
            <div className="login">
              Didn’t received code?
              <a href="/email-verification"> Resend</a>
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
export default OtpVerification;
