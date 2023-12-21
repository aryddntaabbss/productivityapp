import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/UserSlice";
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

const ResetPassword = () => {
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
    <Grid container className="root">
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
        <div className="paper">
          <Typography component="h1" variant="h3" className="title">
            <p>Create new password</p>
          </Typography>
          <Typography component="h1" variant="h3" className="paragraph">
            <p>Your new password must be unique from those previously used.</p>
          </Typography>
          <form className="form" noValidate onSubmit={handleSubmit}>
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
              className="submit"
            >
              <p>Reset Password</p>
            </Button>
            <br />
            <br />
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

export default ResetPassword;
