import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import customAvatarImage from "../../../app/components/assets/image/rllogo.png";

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
    fontSize: "16px",
    // fontWeight: "bold",
    color: "#8391A1",
    textAlign: "center",
    margin: "20px 70px 30px 90px",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    fontFamily: "Playfair Display",
    margin: "20px 80px 50px 90px",
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

const Success = () => {
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
          <Typography component="h1" variant="h3" className={classes.title}>
            Success
          </Typography>
          <Typography component="h1" variant="h3" className={classes.paragraph}>
            Your new password must be unique from those previously used.
          </Typography>
          <form className={classes.form}>
            <Button
              href="/login"
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Back to Login
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Success;
