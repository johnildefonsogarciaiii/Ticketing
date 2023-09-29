import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { isError } from "../../store/displaySlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorAlert({text}) {
  const dispatch = useDispatch();
  const error = useSelector(state => state.display.error);
  const open = error

  const handleClose = () => dispatch(isError(false));
  return (
    <>
      {open ? (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {text}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}
