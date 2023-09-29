import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function SearchLegend() {
  return (
    <React.Fragment>
      <Typography variant="overline"> Legend: </Typography>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
      >
        <Box
          sx={{
            width: {
              xs: 20,
            },
            height: {
              xs: 20,
            },
            bgcolor: "success.main",
            my: {
              xs: 0.5,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              ml: {
                xs: 4,
                sm: 3,
              },
            }}
          >
            Submitted
          </Typography>
        </Box>

        <Box
          sx={{
            width: {
              xs: 20,
            },
            height: {
              xs: 20,
            },
            bgcolor: "warning.main",
            ml: {
              xs: 0,
              sm: 8,
            },
            my: {
              xs: 0.5,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              ml: {
                xs: 4,
                sm: 3,
              },
            }}
          >
            Processing
          </Typography>
        </Box>

        <Box
          sx={{
            width: {
              xs: 20,
            },
            height: {
              xs: 20,
            },
            bgcolor: "info.main",
            ml: {
              xs: 0,
              sm: 9,
            },
            my: {
              xs: 0.5,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              ml: {
                xs: 4,
                sm: 3,
              },
            }}
          >
            Completed
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: 20,
            },
            height: {
              xs: 20,
            },
            bgcolor: "error.main",
            ml: {
              xs: 0,
              sm: 9,
            },
            my: {
              xs: 0.5,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              ml: {
                xs: 4,
                sm: 3,
              },
            }}
          >
            Cancelled
          </Typography>
        </Box>
      </Stack>
    </React.Fragment>
  );
}
