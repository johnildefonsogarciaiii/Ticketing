import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


export default function SelectText({ defaultValue, Header, Text1, Text2, Text3, Text4, Text5, inputValue , name,  value}) {

  
 
  return (
    <div>
      <FormControl
        variant="standard"
        sx={{
          width: {
            xs: 200,
            sm: 400,
            md: 230,
            lg: 280,
          },
          my: 1
        }}
      >
        <InputLabel id="demo-simple-select-standard-label">{Header}</InputLabel>
        <Select
          labelId="Department"
          id="Department" 
          value = {value}    
          onChange={inputValue}
          name= {name}
          label="Department"
        >
          <MenuItem value={Text1}>{Text1}</MenuItem>
          <MenuItem value={Text2}>{Text2}</MenuItem>
          <MenuItem value={Text3}>{Text3}</MenuItem>
          <MenuItem value={Text4}>{Text4}</MenuItem>
          <MenuItem value={Text5}>{Text5}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
