import { Container, Paper } from "@mui/material";




export default function Monitoring(){


    return(
        <Container
        sx={{
          mt: {
            xs: 9,
          },
          ml: {
            xs: 8,
          },
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: {
              xs: 350,
            },
            height: {
              xs: 600,
            }
          },
        }}
      >
        <Paper elevation={3}>User Profile</Paper>
      </Container>
    )
}