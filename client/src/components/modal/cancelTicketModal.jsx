import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { isUpdated } from "../../store/displaySlice";
import * as TicketAPI from "../../api/ticketAPI";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CancelTicketModal({ticketID}) {
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

  const handleCancel = () => {
    try {
      const patchingTicket = async () => {
        const res = await TicketAPI.cancelTicket(ticketID, {
          headers: { Authorization: `Bearer ${token}` },
        });
      };
      patchingTicket();
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
      dispatch(isUpdated(true));
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>Actions</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button sx={style} onClick={handleCancel}>
            Cancel Ticket
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
