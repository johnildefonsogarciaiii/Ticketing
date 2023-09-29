import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import "../../App.css";

const columns = [
  {
    id: "ticketID",
    align: "left",
    label: "Ticket ID",
    minWidth: 100,
  },
  {
    id: "email",
    align: "left",
    label: "Email",
    minWidth: 100,
  },
  {
    id: "description",
    align: "left",
    label: "Description",
    minWidth: 100,
    maxWidth: 150,
  },
  {
    id: "concern",
    label: "Concern",
    minWidth: 100,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 150,
    align: "left",
  },
  {
    id: "locationFrom",
    label: "Location From",
    minWidth: 150,
    align: "left",
  },
  {
    id: "locationTo",
    label: "Location To",
    minWidth: 150,
    align: "left",
  },
  {
    id: "endorsedTo",
    label: "Endorsed To",
    minWidth: 150,
    align: "left",
  },
  {
    id: "dateRequested",
    label: "Date Requested",
    minWidth: 160,
    align: "left",
  },
  {
    id: "dateProcessed",
    label: "Date Processed",
    minWidth: 160,
    align: "left",
  },
  {
    id: "dateCompleted",
    label: "Date Completed",
    minWidth: 160,
    align: "left",
  },
];

export default function AllTicketsTable({ tickets }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
      <TableContainer sx={{ height: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={
                            row.status === "submitted"
                              ? "Submitted-row"
                              : row.status === "processing"
                              ? "Processed-row"
                              : row.status === "completed"
                              ? "Completed-row"
                              : "Cancelled-row"
                          }
                        >
                          {value ===  row.dateRequested ? row.dateRequested.split("T")[0] 
                          : value ===  row.dateProcessed ? row.dateProcessed ? row.dateProcessed.split("T")[0] : undefined
                          : value ===  row.dateCompleted ? row.dateCompleted ? row.dateCompleted.split("T")[0] : undefined
                          : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
