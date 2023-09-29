import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthService from "../services/AuthService";
import Authentication from "./Authentication";

import SideBar from "../layout/SideBar";
import UserProfile from "../layout/UserProfile";
import UserTickets from "../layout/UserTickets";
import AllTickets from "../layout/AllTickets";
import OpenTickets from "../layout/OpenTickets";

export default function Home() {
  const authService = AuthService();


// console.log(user)

  return (
    <>
      {!authService.isAuthenticated() ? (
        <Authentication />
      ) : (
        <Router>
          <SideBar />

          <Routes>
            <Route exact path="/" Component={UserProfile} />
            <Route exact path="/home" Component={UserProfile} />
            <Route exact path="/profile" Component={UserProfile} />
            <Route path="/tickets" Component={UserTickets} />
            <Route path="/all-tickets" Component={AllTickets} />
            <Route path="/monitoring" Component={OpenTickets} />
          </Routes>
        </Router>
       )}
    </>
  );
}
