import { Box, TextField } from "@mui/material";

export default function SearchInput({ label, searchInputHandler }) {
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onChange={searchInputHandler}
      >
        <TextField
          id="standard-search"
          label={label}
          type="search"
          variant="standard"
          sx={{ width: { xs: 200, sm: 400 } }}
        />
      </Box>
    </>
  );
}
