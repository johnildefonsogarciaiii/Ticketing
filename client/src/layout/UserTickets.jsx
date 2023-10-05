import { Box, Container, Paper } from "@mui/material";

import TicketTable from "../components/tables/userTicketsTable";
import SearchLegend from "../components/text/searchLegend";
import ContentHeader from "../components/text/contentHeader";
import SearchInput from "../components/inputFields/searchInput";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as TicketAPI from "../api/ticketAPI";
import { setTickets } from "../store/ticketSlice";
import CreateTicketForm from "./CreateTicketForm";
import Loader from "../components/loader";
import SuccessAlert from "../components/alert/successAlert";
import ErrorAlert from "../components/alert/errorAlert";
import UpdatedAlert from "../components/alert/updatedAlert";
import * as UserAPI from "../api/userAPI";
import { setUser } from "../store/userSlice";
import { isLoading } from "../store/displaySlice";

export default function UserTickets() {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.display.loader);

  const success = useSelector((state) => state.display.success);
  const error = useSelector((state) => state.display.error);
  const updated = useSelector((state) => state.display.updated);
  const ticket = useSelector((state) => state.ticket.ticket);
  const [currentUser, setCurrentUser] = useState({});

  // getting token from cookies
  const getToken = document.cookie.split("=");
  const token = getToken[1];

  const userTicket = ticket.filter((ticket) => ticket.email === currentUser);
  const reversedUserTicket = [...userTicket].reverse();

  const [searchTicketID, setSearchTicketID] = useState("");
  const [searchConcern, setSearchConcern] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchedTickets, setSearchedTickets] = useState("");

  const reversedSearchedTickets = [...searchedTickets].reverse();
  // console.log(query)
  // console.log(searchConcern)

  useEffect(() => {
    if (searchTicketID !== "") {
      if (searchConcern !== "" || searchDescription !== "") {
        const filteredTickets = searchedTickets.filter((ticket) =>
          ticket.ticketID.includes(searchTicketID)
        );
        setSearchedTickets(filteredTickets);
      } else {
        const filteredTickets = userTicket.filter((ticket) =>
          ticket.ticketID.includes(searchTicketID)
        );
        setSearchedTickets(filteredTickets);
      }
    }
    if (searchConcern !== "") {
      if (searchTicketID !== "" || searchDescription !== "") {
        const filteredTickets = searchedTickets.filter((ticket) =>
          ticket.concern.includes(searchConcern)
        );
        setSearchedTickets(filteredTickets);
      } else {
        const filteredTickets = userTicket.filter((ticket) =>
          ticket.concern.includes(searchConcern)
        );
        setSearchedTickets(filteredTickets);

        console.log(filteredTickets);
      }
    }

    if (searchDescription !== "") {
      if (searchTicketID !== "" || searchConcern !== "") {
        let filteredTickets = searchedTickets.filter((ticket) =>
          ticket.description.includes(searchDescription)
        );
        setSearchedTickets(filteredTickets);
      } else {
        const filteredTickets = userTicket.filter((ticket) =>
          ticket.description.includes(searchDescription)
        );
        setSearchedTickets(filteredTickets);
      }
    }

    if (
      searchTicketID === "" &&
      searchConcern === "" &&
      searchDescription === ""
    ) {
      setSearchedTickets("");
    }
  }, [searchTicketID, searchConcern, searchDescription]);
  

  // Fetching Current User
  useEffect(() => {

    async function fetchingUser() {
          dispatch(isLoading(true));
      const res = await UserAPI.getCurrentUser({
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(res.data.data.data));
      setCurrentUser(res.data.data.data.email);
    dispatch(isLoading(false));
    }
    fetchingUser();
  }, []);

  // Fetching User Tickets
  useEffect(() => {
    async function fetchingTickets() {
          dispatch(isLoading(true));
      const res = await TicketAPI.getAllTicket();
      dispatch(setTickets(res.data.data.tickets));
    dispatch(isLoading(false));
    }
    fetchingTickets();
  // }, [ticket, error, success]);
      }, []);

  // Onchange Handlers
  const ticketIDOnChangeHandler = (e) => {
    e.preventDefault();
    setSearchTicketID(e.target.value);
  };
  const concernOnChangeHandler = (e) => {
    e.preventDefault();
    setSearchConcern(e.target.value);
  };

  const descriptionOnChangeHandler = (e) => {
    e.preventDefault();
    setSearchDescription(e.target.value);
  };



  return (
    <>
      {loader ? <Loader /> : null}
      {success ? <SuccessAlert text="Ticket was created" /> : null}
      {error ? <ErrorAlert text="Please fill-out all text fields" /> : null}
      {updated ? <UpdatedAlert text="Ticket was updated" /> : null}
      <Container
        sx={{
          position: "absolute",
          top: {
            xs: 570,
            sm: 530,
            md: 530,
          },
          left: {
            xs: "65%",
            sm: 450,
            md: "55%",
            lg: 660,
          },
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: {
              xs: 300,
              sm: 600,
              md: 900,
              lg: 1200,
            },
            minHeight: 500,
          },
        }}
      >
        {/* Content */}
        <Paper elevation={3}>
          <Container
            sx={{
              maxWidth: {
                xs: 250,
                sm: 550,
                md: 850,
                lg: 1050,
                xl: 1150,
              },
              margin: 4,
            }}
          >
            {/* Header */}
            <ContentHeader text={"User Tickets"} />
            {/* Search Legend */}
            <SearchLegend />
            <CreateTicketForm />
            <Box>
              <SearchInput
                label={"Search Ticket ID"}
                searchInputHandler={ticketIDOnChangeHandler}
              />
              <SearchInput
                label={"Search Concern"}
                searchInputHandler={concernOnChangeHandler}
              />
              <SearchInput
                label={"Search Description"}
                searchInputHandler={descriptionOnChangeHandler}
              />
            </Box>

            {/* User Ticket List */}
            <Box>
              {searchedTickets ? (
                <TicketTable tickets={reversedSearchedTickets} />
              ) : (
                <TicketTable tickets={reversedUserTicket} />
              )}
            </Box>
          </Container>
        </Paper>
      </Container>
    </>
  );
}
