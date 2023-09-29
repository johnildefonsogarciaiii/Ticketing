import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { isError, isLoading, isUpdated } from "../../store/displaySlice";
import * as TicketAPI from "../../api/ticketAPI";
import ProcessTicketModal from "./processTicketModal";
import { red } from "@mui/material/colors";

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
  width: 210,
  height: 50,
  margin: 1,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ActionTicketModal({ ticketID }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
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

  const handleCancel = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    try {
      const res = await TicketAPI.deleteTicket(ticketID, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(isUpdated(true));

    } catch (error) {
      dispatch(isError(true));
    } finally {
      setOpen(false);
      dispatch(isLoading(false));
    }
  };



  const handleCompete = async (e) => {
    dispatch(isLoading(true));
    e.preventDefault();

    try {
      const res = await TicketAPI.completeTicket(ticketID, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(isUpdated(true));

    } catch (error) {
      dispatch(isError(true));
    } finally {
      setOpen(false);
      dispatch(isLoading(false));
    }
  };
  return (
    <div>
      <Button sx={{color: "text.primary"}} onClick={handleOpen}>Actions</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Button sx={button}>
          <ProcessTicketModal sx={button} ticketID={ticketID} />

          </Button>
          <Button sx={button} onClick={handleCompete}>
            Complete Ticket
          </Button>
          <Button sx={button} onClick={handleCancel}>
            Cancel Ticket
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
