import { Button, Stack } from "@mui/material";


export default function SaveButton({Text}) {
  return (
    <Stack direction="row" spacing={2}>
      <Button type="submit" variant="outlined" color="success" sx={{ width: {
        xs: 200
      }}}>
        {Text}
      </Button>
    </Stack>
  );
}
