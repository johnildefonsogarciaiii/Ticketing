import { RotatingLines } from "react-loader-spinner";
import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";

export default function Loader() {

 const loader = useSelector(state => state.display.loader)
  return (
    <Backdrop
      open={loader}
      style={{
        zIndex: 1,
        color: "#gray",
        display: "flex",
        opacity: "0.5",
        flexDirection: "column",
      }}
    >
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Backdrop>
  );
}
