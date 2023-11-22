


import React, { useState, } from "react";
import axios from "axios";
import swal from "sweetalert";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import customAvatarImage from "../../modules/image/rllogo.png";

// Style
const useStyles = makeStyles( ( theme ) => ( {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffff",
    height: "130vh",
  },
  paper: {
    display: "flex",
    height: "auto",
    flexDirection: "column",
    padding: "20px",
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
    marginBottom: "10px",
  },

  formControl: {
    width: "100%",
    marginTop: "10px",
  },

  login: {
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
    color: "#ffff",
  },
} ) );

async function registerUser ( credentials )
{
  try
  {
    const response = await axios.post(
      "https://protracker.azurewebsites.net/api/auth/register",
      credentials
    );

    if ( !response.data.ok )
    {
      throw new Error( "Registrasi gagal" );
    }

    return response.data;
  } catch ( error )
  {
    console.error( "Error saat mendaftarkan pengguna:", error.message );
    throw error;
  }
}

export default function Register ()
{
  const classes = useStyles();
  const [ email, setEmail ] = useState( "" );
  const [ username, setUsername ] = useState( "" );
  const [ userType, setUserType ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );
  const [ showConfirmPassword, setShowConfirmPassword ] = useState( false );

  const handleTogglePasswordVisibility = ( field ) =>
  {
    if ( field === "password" )
    {
      setShowPassword( !showPassword );
    } else if ( field === "confirmPassword" )
    {
      setShowConfirmPassword( !showConfirmPassword );
    }
  };

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();

    // Validasi agar email dan username tidak kosong
    if ( !email || !username )
    {
      console.error( "Email dan username harus diisi" );
      return;
    }

    try
    {
      const response = await registerUser( {
        email,
        username,
        userType,
        password,
        confirmPassword,
      } );

      if ( "accessToken" in response )
      {
        swal( "Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        } ).then( ( value ) =>
        {
          localStorage.setItem( "accessToken", response.accessToken );
          localStorage.setItem( "user", JSON.stringify( response.user ) );
          window.location.href = "/login";
        } );
      } else
      {
        swal( "Failed", response.message || "Registrasi gagal.", "error" );
      }
    } catch ( error )
    {
      console.error( "Error during registration:", error );
      swal( "Error", "Registrasi gagal. Silakan coba lagi nanti.", "error" );
    }
  };

  return (
    <Grid container className={ classes.root }>
      <CssBaseline />
      <Grid item xs={ 12 } md={ 5 } component={ Paper } elevation={ 6 }>
        <div className={ classes.paper }>
          <div className={ classes.iconContainer }>
            <div className={ classes.icon }>
              <img src={ customAvatarImage } alt="Avatar" />
            </div>
          </div>
          <Typography component="h1" variant="h3" className={ classes.paragraph }>
            Please Create Account for{ " " }
            <a href="/register">Productivity Tracker App</a>
          </Typography>
          <Typography component="h1" variant="h3" className={ classes.title }>
            Register
          </Typography>
          <form className={ classes.form } noValidate onSubmit={ handleSubmit }>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={ ( e ) => setEmail( e.target.value ) }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
              onChange={ ( e ) => setUsername( e.target.value ) }
            />
            <FormControl variant="outlined" className={ classes.formControl }>
              <InputLabel id="user-type-label">User Type</InputLabel>
              <Select
                labelId="user-type-label"
                id="user-type"
                value={ userType }
                onChange={ ( e ) => setUserType( e.target.value ) }
                label="User Type"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={ showPassword ? "text" : "password" }
              value={ password }
              onChange={ ( e ) => setPassword( e.target.value ) }
              className={ classes.passwordField }
              InputProps={ {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={ () => handleTogglePasswordVisibility( "password" ) }
                    >
                      { showPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
                ),
              } }
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={ showConfirmPassword ? "text" : "password" }
              value={ confirmPassword }
              onChange={ ( e ) => setConfirmPassword( e.target.value ) }
              className={ classes.passwordField }
              InputProps={ {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={ () =>
                        handleTogglePasswordVisibility( "confirmPassword" )
                      }
                    >
                      { showConfirmPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
                ),
              } }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={ classes.submit }
            >
              Agree and Register
            </Button>

            <div className={ classes.login }>
              Have an account?
              <a href="/login"> Login now</a>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
