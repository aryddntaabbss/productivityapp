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
import { makeStyles } from "@material-ui/core/styles";
import { selectToken } from "../../Store/UserSlice";

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
    fontSize: "14px",
    fontWeight: "bold",
    color: "#8391A1",
    textAlign: "left",
    // fontFamily: "Urbanist",
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
    background: "linear-gradient(to right,  #197391, #0F9EEA)",
    color: "#ffffff",
  },
}));

export const OtpVerification = () => {
  const classes = useStyles();
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
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" className={classes.title}>
            OTP Verification
          </Typography>
          <Typography component="h1" variant="h3" className={classes.paragraph}>
            Enter the verification code we just send on your OTP address.
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
              className={classes.submit}
            >
              Verify
            </Button>
            <div className={classes.login}>
              Didn’t received code?
              <a href="/email-verification"> Resend</a>
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
export default OtpVerification;
