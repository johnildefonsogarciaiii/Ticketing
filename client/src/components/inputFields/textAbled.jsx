import TextField from "@mui/material/TextField";

export default function TextAbled({ sx, value, label , inputValue, name}) {
  return (
    <div>
      <TextField
        sx={sx}
        id="filled-required"
        label={label}
        variant="standard"
        value={value}
        name= {name}
        onChange={inputValue}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
