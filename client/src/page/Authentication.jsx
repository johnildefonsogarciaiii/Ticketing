import LoginForm from "../layout/LoginForm";
import SignUpForm from "../layout/SignupForm";
import assets from "../assets";
import AuthService from "../services/AuthService";
import Loader from "../components/loader";
import ErrorAlert from "../components/alert/errorAlert";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoading, isSignup, isError } from "../store/displaySlice";
import { setAllUsers, setUserError } from "../store/userSlice";
import * as UserAPI from "../api/userAPI";
import history from "../services/History";

import { Grid, Box, colors } from "@mui/material";
import Home from "./Home";

export default function Authentication() {
  const authService = AuthService();
  const dispatch = useDispatch();

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState("unset");
  const [width, setWidth] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(
    assets.images.signinBg
  );

  const signup = useSelector((state) => state.display.signup);
  const loader = useSelector((state) => state.display.loader);
  const error = useSelector((state) => state.display.error);
  const allUsers = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    const fetchingAllUsers = async () => {
      const res = await UserAPI.getAllUsers();
      dispatch(setAllUsers(res.data.data.user));
    };
    fetchingAllUsers();
  }, []);

  //Handle Login handleSignup
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    const data = new FormData(e.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      //creating error if text field is empty
      if (user.email === "" && user.password === "") {
        dispatch(setUserError({ name: false, email: true, password: true }));
      } else if (user.email === "") {
        dispatch(setUserError({ name: false, email: true, password: false }));
      } else if (user.password === "") {
        dispatch(setUserError({ name: false, email: false, password: true }));
      } else {
        const success = await authService.login(user.email, user.password);
        if (!success) {
          dispatch(isError(true));
        } else {
          history.push("/home");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoading(false));
    }
  };

  //Handle Signin
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));

    const data = new FormData(e.currentTarget);
    const formData = {
      employeeID: "23-" + 1 + allUsers.length,
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
    };

    try {
      //creating error if text field is empty
      if (
        formData.email === "" &&
        formData.password === "" &&
        formData.name === ""
      ) {
        dispatch(setUserError({ name: true, email: true, password: true }));
      } else if (formData.email === "" && formData.password === "") {
        dispatch(setUserError({ name: false, email: true, password: true }));
      } else if (formData.email === "" && formData.name === "") {
        dispatch(setUserError({ name: true, email: true, password: false }));
      } else if (formData.password === "" && formData.name === "") {
        dispatch(setUserError({ name: true, email: false, password: true }));
      } else if (formData.email === "") {
        dispatch(setUserError({ name: false, email: true, password: false }));
      } else if (formData.password === "") {
        dispatch(setUserError({ name: false, email: false, password: true }));
      } else if (formData.name === "") {
        dispatch(setUserError({ name: true, email: false, password: false }));
      } else {
        const success = await UserAPI.signup(formData);
        history.push("/home");

        const login = await authService.login(
          formData.email,
          formData.password
        );
      }
      window.location.reload();
    } catch (error) {
      dispatch(isError(true));
    } finally {
      dispatch(isLoading(false));
    }
  };

  //aninmations
  const onSwitchMode = () => {
    setWidth(100);
    dispatch(setUserError(false));

    const timeout1 = setTimeout(() => {
      setBackgroundImage(
        signup ? assets.images.signinBg : assets.images.signupBG
      );
      dispatch(isSignup(!signup));
    }, 1100);

    const timeout2 = setTimeout(() => {
      setLeft("unset");
      setRight(0);
      setWidth(0);
    }, 1200);

    const timeout3 = setTimeout(() => {
      setRight("unset");
      setLeft(0);
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  };

  return (
    <>
      {authService.isAuthenticated() ? (
        <Home />
      ) : (
        <Grid container sx={{ height: "100vh" }}>
          {loader ? <Loader /> : null}
          {error ? (
            <ErrorAlert text="Please enter valid email or password" />
          ) : null}
          <Grid
            item
            xs={12}
            sm={5}
            md={4}
            sx={{ position: "relative", padding: 3 }}
          >
            {signup ? (
              <SignUpForm
                handleSignup={handleSignup}
                onSwitchMode={onSwitchMode}
              />
            ) : (
              <LoginForm
                handleLogin={handleLogin}
                onSwitchMode={onSwitchMode}
              />
            )}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: left,
                right: right,
                width: `${width}%`,
                height: "100%",
                bgcolor: colors.grey[200],
                transition: "all 1s ease-in-out",
              }}
            />
          </Grid>
          <Grid
            item
            xs={0}
            sm={7}
            md={8}
            sx={{
              position: "relative",
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: left,
                right: right,
                width: `${width}%`,
                height: "100%",
                bgcolor: colors.common.white,
                transition: "all 1s ease-in-out",
              }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
