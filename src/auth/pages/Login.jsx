import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import customAvatarImage from "../../image/rllogo.png";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
    height: "100vh",
  },
  paper: {
    display: "flex",
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
    textAlign: "right",
    "& a": {
      textDecoration: "none",
      color: "#0F9EEA",
      fontWeight: "bold",
    },
  },
  register: {
    fontSize: "14px",
    color: "#000",
    textAlign: "center",
    "& a": {
      textDecoration: "none",
      color: "#0F9EEA",
      fontWeight: "bold",
    },
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
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
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
              <a href="#forgot-password">Forgot Password?</a>
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
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
