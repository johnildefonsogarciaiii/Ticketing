import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

export default function TextDisabled({ value, label }) {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <TextField
        sx={{
          width: {
            xs: 200,
            sm: 400,
            md: 230,
            lg: 280,
          },
          my: 1,
        }}
        id="filled-disabled"
        label={label}
        variant="standard"
        InputProps={{
          readOnly: true,
        }}
       value={value}
      />
    </div>
  );
}
