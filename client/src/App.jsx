import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import Authentication from "./page/Authentication";
import Home from "./page/Home";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <div>
        <Home/>
        {/* <Authentication /> */}
      </div>
    </>
  );
}

export default App;
