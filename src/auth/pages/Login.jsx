import React, { useState } from "react";
import axios from "axios";
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
import swal from "sweetalert";
import customAvatarImage from "../../image/rllogo.png";
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

//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API}/auth/login`,

//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error saat login:", error);
//     throw error;
//   }
async function loginUser(email, password) {
  try {
    const response = await axios.post(
      "https://protracker.azurewebsites.net/api/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);

      if ("accessToken" in response) {
        swal("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        }).then(() => {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("user", JSON.stringify(response.user));
          // Use React Router for navigation
          // Example: history.push("/");
        });
      } else {
        swal("Failed", response.message, "error");
      }
    } catch (error) {
      swal("Error", "Login failed. Please check your credentials.", "error");
    }
  };

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
}

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate.push("/");
//     }
//   }, [navigate]);

//   async function login() {
//     console.warn(email, password);

//     try {
//       let item = { email, password };
//       let response = await fetch(
//         "https://protracker.azurewebsites.net/api/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify(item),
//         }
//       );

//       if (response.ok) {
//         let result = await response.json();
//         // Handle the result, e.g., store token in local storage
//         // Redirect to the dashboard
//         localStorage.setItem("token", result.token);
//         navigate("/dashboard");
//       } else {
//         // Handle error response
//         console.error("Login failed:", response.statusText);
//         // Display an error message to the user
//       }
//     } catch (error) {
//       console.error("An error occurred during login:", error);
//       // Display an error message to the user
//     }
//   }

//   return (
//     <>
//       <div>
//         <h1>Login Page</h1>
//         <p>Please login to access the dashboard.</p>
//         <input
//           type="text"
//           placeholder="email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="form-control"
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="form-control"
//         />
//         <button onClick={login}>Login</button>
//       </div>
//     </>
//   );
// }

// export default Login;
