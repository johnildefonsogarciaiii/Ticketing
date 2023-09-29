import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { isSuccess } from "../../store/displaySlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessAlert({text}) {
  const dispatch = useDispatch();
  const success = useSelector(state => state.display.success);
  const open = success

  const handleClose = () => dispatch(isSuccess(false));
  return (
    <>
      {open ? (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {text}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}
