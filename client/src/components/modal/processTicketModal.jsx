import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { isError, isLoading, isUpdated } from "../../store/displaySlice";
import * as TicketAPI from "../../api/ticketAPI";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const button = {
  width: 200,
  height: 50,
  margin: 1,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProcessTicketModal({ ticketID }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [messenger, setMessenger] = React.useState("");

  // actions handler
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // getting token from cookies
  const getToken = document.cookie.split("=");
  const token = getToken[1];

  const handleProcess = async () => {
    dispatch(isLoading(true));

    try {
      const res = await TicketAPI.processTicket(
        ticketID,
        {
          status: "processing",
          dateProcessed: Date.now(),
          endorsedTo: messenger,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(isUpdated(true));

      console.log(res);
    } catch (error) {
      console.log(error)
      dispatch(isError(true));
      setMessenger("");
    } finally {
      setOpen(false);
      dispatch(isLoading(false));
    }
  };

  const changeHandler = (e) => {
    setMessenger(e.target.value);
    console.log(messenger);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Process Ticket</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Entorsed To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              value={messenger}
              label="Endorsed To"
              onChange={changeHandler}
            >
              <MenuItem value={"messenger 1"}>messenger 1</MenuItem>
              <MenuItem value={"messenger 2"}>messenger 2</MenuItem>
              <MenuItem value={"messenger 3"}>messenger 3</MenuItem>
              <MenuItem value={"messenger 4"}>messenger 4</MenuItem>
            </Select>
          </FormControl>

          <Button sx={button} onClick={handleProcess}>
            Process Ticket
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
