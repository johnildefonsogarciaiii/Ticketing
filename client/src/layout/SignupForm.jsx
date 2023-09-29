import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../services/AuthService";

import { useDispatch, useSelector } from 'react-redux';
import { setUserError } from "../store/userSlice";
import { isLoading } from "../store/displaySlice";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Project of John Garcia III."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUpForm({ onSwitchMode, handleSignup }) {
  const authService = AuthService();
  const dispatch = useDispatch()
  const error = useSelector(state => state.user.error)
  //clearing error to text field if text change
  const onChange = (e) => {
    const data = new FormData(e.currentTarget);

    const user = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
    };

    if (user.email.length >= 1) {
      dispatch(setUserError({ name: false, email: false, password: false }));
    }
    if (user.password.length >= 1) {
      dispatch(setUserError({ name: false, email: false, password: false }));
    }
    if (user.name.length >= 1) {
      dispatch(setUserError({ name: false, email: false, password: false }));
    }

  };


  const demoVersionHandler = async() => {
    dispatch(isLoading(true))
    try {
    const login = await authService.login("Demo@gmail.com", "Demo@gmail.com" );
    } catch (error) {
      console.log(error)
    } finally {
    dispatch(isLoading(false))
    }
  }

  
  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* image and header */}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              onChange={onChange}
              noValidate
              onSubmit={handleSignup}
              sx={{ mt: 3 }}
            >
              {/* form */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* first name input */}
                  {error.name ? (
                    <TextField
                      error
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="firstName"
                      label="Name"
                      helperText="Please enter your name."
                      autoFocus
                    />
                  ) : (
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="First Name"
                      autoFocus
                    />
                  )}
                </Grid>

                {/* email input */}
                <Grid item xs={12}>
                  {error.email ? (
                    <TextField
                      error
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      helperText="Please enter email address."
                    />
                  ) : (
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  )}
                </Grid>

                {/* password input */}
                <Grid item xs={12}>
                  {error.password ? (
                    <TextField
                      error
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      helperText="Please enter password."
                    />
                  ) : (
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  )}
                </Grid>
              </Grid>

              {/* submit Btn */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Button
              onClick={demoVersionHandler}
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
              >
                Sign Up as Demo Version
              </Button>

              {/* switch Btn */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={onSwitchMode}>
                    Already have an account?
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
