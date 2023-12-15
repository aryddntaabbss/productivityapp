import "./style.scss";
import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Success = () => {
  return (
    <Grid container className="root">
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={6}>
        <div className="paper">
          <Typography component="h1" variant="h3" className="title">
            <p>Success</p>
          </Typography>
          <Typography component="h1" variant="h3" className="paragraph">
            <p>Your new password must be unique from those previously used.</p>
          </Typography>
          <form className="form">
            <Button
              href="/login"
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
            >
              <p>Back to Login</p>
            </Button>
            <br />
            <br />
            <br />
            <br />
            <br />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Success;
