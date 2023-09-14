import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { setUserError } from "../store/userSlice";

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

export default function LoginForm({ onSwitchMode, handleLogin }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const emailError = error.email;
  const passwordError = error.password;




  //clearing error to text field if text change
  const onChange = (e) => {
    const data = new FormData(e.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (user.email.length >= 1) {
      dispatch(setUserError({ name: false, email: false, password: false }));
    }
    if (user.password.length >= 1) {
      dispatch(setUserError({ name: false, email: false, password: false }));
    }
  };

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
            {/* image and header*/}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            {/* input form */}
            <Box
              component="form"
              onSubmit={handleLogin}
              onChange={onChange}
              noValidate
              sx={{ mt: 1 }}
            >
              {" "}
              {/* email */}
              {emailError ? (
                <TextField
                  error
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText="Please enter email."
                  autoFocus
                />
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              )}
              {/* password */}
              {passwordError ? (
                <TextField
                  error
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText="Please enter password."
                />
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              )}
              {/* submit Btn */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* switch Btn */}
              <Grid container>
                <Grid item>
                  <Button onClick={onSwitchMode}>
                    {"Don't have an account?"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
