import { Box, Container, Paper } from "@mui/material";
import TicketTable from "../components/tables/allTicketsTable";
import SearchLegend from "../components/text/searchLegend";
import ContentHeader from "../components/text/contentHeader";
import SearchInput from "../components/inputFields/searchInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AllTickets() {
  const ticket = useSelector((state) => state.ticket.ticket);

  const reversedTicket = [...ticket].reverse()

  const [searchTicketID, setSearchTicketID] = useState("");
  const [searchConcern, setSearchConcern] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchedTickets, setSearchedTickets] = useState("");

  const reversedSearchedTickets = [...searchedTickets].reverse();

  useEffect(() => {
    if (searchTicketID !== "") {
      if (searchConcern !== "" || searchDescription !== "") {
        const filteredTickets = searchedTickets.filter((ticket) =>
          ticket.ticketID.includes(searchTicketID)
        );
        setSearchedTickets(filteredTickets);
        console.log("1");
      } else {
        const filteredTickets = ticket.filter((ticket) =>
          ticket.ticketID.includes(searchTicketID)
        );
        setSearchedTickets(filteredTickets);
        console.log("2");
      }
    }
    if (searchConcern !== "") {
      if (searchTicketID !== "" || searchDescription !== "") {
        const filteredTickets = searchedTickets.filter((ticket) =>
          ticket.concern.includes(searchConcern)
        );
        setSearchedTickets(filteredTickets);
        console.log("3");
      } else {
        const filteredTickets = ticket.filter((ticket) =>
          ticket.concern.includes(searchConcern)
        );
        setSearchedTickets(filteredTickets);

        console.log("4");
      }
    }

    if (searchDescription !== "") {
      if (searchTicketID !== "" || searchConcern !== "") {
        let filteredTickets = searchedTickets.filter((ticket) =>
          ticket.description.includes(searchDescription)
        );
        setSearchedTickets(filteredTickets);
        console.log("5");
      } else {
        const filteredTickets = ticket.filter((ticket) =>
          ticket.description.includes(searchDescription)
        );
        setSearchedTickets(filteredTickets);
        console.log("6");
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
          <ContentHeader text={"All Tickets"} />
          {/* Search Legend */}
          <SearchLegend />

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
            <TicketTable tickets={searchedTickets ? reversedSearchedTickets : reversedTicket} />
          </Box>
        </Container>
      </Paper>
    </Container>
  );
}
