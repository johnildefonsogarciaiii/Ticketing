import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export default function ContentHeader({ text }) {
  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6" gutterBottom>
          {text}
        </Typography>
        <Divider />
      </Box>
    </React.Fragment>
  );
}
