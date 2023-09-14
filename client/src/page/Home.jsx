import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import AuthService from "../services/AuthService";
import Authentication from "./Authentication";

import SideBar from "../layout/SideBar";
import UserProfile from "../layout/UserProfile";
import UserTickets from "../layout/UserTickets";
import Dashboard from "../layout/Dashboard";
import AllTickets from "../layout/AllTickets";
import Monitoring from "../layout/Monitoring";

export default function Home() {
  const authService = AuthService();

  return (
    <>
      {/* {!authService.isAuthenticated() ? (
        <Authentication />
      ) : ( */}
        <Router>
          <SideBar />

          <Routes >
            <Route exact path="/" element={<UserProfile/>} />
            <Route exact path="/home" element={<UserProfile/>} />
            <Route exact path="/profile" element={<UserProfile/>} />
            <Route path="/tickets" element={<UserTickets/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/all-tickets" element={<AllTickets/>} />
            <Route path="/monitoring" element={<Monitoring/>} />
          </Routes >
        </Router>
      {/* )} */}
    </>
  );
}
