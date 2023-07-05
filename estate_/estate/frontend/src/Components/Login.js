import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  formContainer: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    border: "5px solid black",
    position: "relative",
  },
  loginBtn: {
    backgroundColor: "green",
    color: "white",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
});

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.formContainer}>
      <form>
        <Grid item container justifyContent="center">
          <Typography variant="h5">Sign IN</Typography>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            type="password"
          />
        </Grid>

        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
          />
        </Grid>

        <Grid
          item
          container
          xs={8}
          style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            fullWidth
            type="submit"
            className={classes.loginBtn}
          >
            Sign In
          </Button>
        </Grid>
      </form>
      <Grid item container justifyContent="center">
        <Typography variant="small">Don't have an account yet?
          <span
              onClick={() => navigate('/register')}
              style={{ cursor: "pointer", color: "green" }}
          >
            Sign Up</span> </Typography>
      </Grid>
    </div>
  );
}

export default Login;
