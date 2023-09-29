import * as React from "react";
import {
  Divider,
  SpeedDial,
  SpeedDialIcon,
  Stack,
  Typography,
  Backdrop,
  Box,
  Modal,
  Fade,
} from "@mui/material";
import TextAbled from "../components/inputFields/textAbled";
import SaveButton from "../components/saveButton";
import { isError, isLoading, isSuccess } from "../store/displaySlice";
import { useSelector, useDispatch } from "react-redux";
import { setTickets } from "../store/ticketSlice";
import * as TicketAPI from "../api/ticketAPI";
import { useEffect } from "react";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 300,
    sm: 500,
    md: 900,
    lg: 900,
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateTicketForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const ticket = useSelector((state) => state.ticket);

  //initializing Input Data for Updating User Info
  const [inputData, setInputData] = React.useState({});

  const inputValue = (e) => {
    const { name, value } = e.target;

    // Update the state object with the new value
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // getting token from cookies
  const getToken = document.cookie.split("=");
  const token = getToken[1];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   Fetching Tickets
  useEffect(() => {
    const fetchingTickets = async () => {
      const res = await TicketAPI.getAllTicket();
      dispatch(setTickets(res.data.data.tickets));
    };
    fetchingTickets();
  }, []);

  // handle submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(isLoading(true));

    try {
        const res = await TicketAPI.createTicket(
          {
            ...inputData,
            ticketID: "23-" + Number(ticket.ticket.length),
            status: "submitted",
            actions: true,
            email: user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(isSuccess(true));
        handleClose();
    } catch (error) {
      dispatch(isError(true));
      console.log(error)
    } finally {
      dispatch(isLoading(false));
      setInputData({});
    }
  };



  return (
    <div>
      <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 0, right: 0 }}
          icon={<SpeedDialIcon />}
          onClick={handleOpen}
        ></SpeedDial>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Sumbit a Ticket
            </Typography>
            <Divider />
            <br />
            <Stack
              direction={{
                xs: "column",
              }}
              spacing={{
                xs: 2,
                sm: 4,
              }}
              marginBottom={6}
            >
              <TextAbled
                sx={{
                  width: {
                    xs: 200,
                    sm: 400,
                    md: 600,
                    lg: 600,
                  },
                }}
                defaultValue=""
                label={"Description"}
                name={"description"}
                inputValue={inputValue}
              />
              <TextAbled
                sx={{
                  width: {
                    xs: 200,
                    sm: 400,
                    md: 600,
                    lg: 600,
                  },
                }}
                defaultValue=""
                label={"Concern"}
                name={"concern"}
                inputValue={inputValue}
              />
              <TextAbled
                sx={{
                  width: {
                    xs: 200,
                    sm: 400,
                    md: 600,
                    lg: 600,
                  },
                }}
                defaultValue=""
                label={"Location From"}
                name={"locationFrom"}
                inputValue={inputValue}
              />{" "}
              <TextAbled
                sx={{
                  width: {
                    xs: 200,
                    sm: 400,
                    md: 600,
                    lg: 600,
                  },
                }}
                defaultValue=""
                label={"Location To"}
                name={"locationTo"}
                inputValue={inputValue}
              />
            </Stack>
            <form onClick={handleSubmit}>
              <SaveButton Text={"Submit"} />
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
