import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { isUpdated } from "../../store/displaySlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UpdatedAlert({text}) {
  const dispatch = useDispatch();
  const updated = useSelector(state => state.display.updated);
  const open = updated

  const handleClose = () => dispatch(isUpdated(false));
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
