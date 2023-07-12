import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

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
  const initialState = {
      usernameValue: "",
      passwordValue: "",
      sendRequest: 0,
  }
  function ReducerFunction(draft, action) {
  switch (action.type) {
    case "catchUsernameChange":
      draft.usernameValue = action.usernameChosen;
      break;

    case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        draft.serverError = false;
        break;

    case "changeSendRequest":
      draft.sendRequest = draft.sendRequest + 1;
      break;
  }
}


  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function FormSubmit(e) {
		e.preventDefault();
        console.log("the form has submitted")
        dispatch({type: "changeSendRequest"})
	}

  useEffect(() => {
		if (state.sendRequest) {
			const source = Axios.CancelToken.source();
			async function SignIn() {
				try {
					const response = await Axios.post(
						"http://127.0.0.1:8000/api-auth-djoser/token/login",
						{
							username: state.usernameValue,
							password: state.passwordValue,
						},
						{
							cancelToken: source.token,
						}
					);

					dispatch({ type: "openTheSnack" });
				} catch (error) {
					console.log(error.response);
				}
			}
			SignIn();
			return () => {
				source.cancel();
			};
		}
  }, [state.sendRequest]);

  return (
    <div className={classes.formContainer}>
      <form onSubmit={FormSubmit}>
        <Grid item container justifyContent="center">
          <Typography variant="h5">Sign IN</Typography>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
    		onChange={(e) =>
    	        dispatch({
    		        type: "catchUsernameChange",
    		        usernameChosen: e.target.value,
    	        })
            }
          />
        </Grid>

        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
			onChange={(e) =>
				dispatch({
					type: "catchPasswordChange",
					passwordChosen: e.target.value,
				})
			}
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
