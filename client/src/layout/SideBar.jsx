import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/userSlice";
import { isLoading } from "../store/displaySlice";
import * as UserAPI from "../api/userAPI";
import * as TicketAPI from "../api/ticketAPI";
import { setTickets } from "../store/ticketSlice";
import { useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import AuthService from "../services/AuthService";
import history from "../services/History";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const ticket = useSelector((state) => state.ticket);

  const authService = AuthService();

  // getting token from cookies
  const getToken = document.cookie.split("=");
  const token = getToken[1];

  // Fetching Current User
  useEffect(() => {
    async function fetchingUser() {
      const res = await UserAPI.getCurrentUser({
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(res.data.data.data));
    }
    fetchingUser();
  }, []);

  // Fetching All Tickets
  useEffect(() => {
    async function fetchingAllTickets() {
      const res = await TicketAPI.getAllTicket();
      dispatch(setTickets(res.data.data.tickets));
    }
    fetchingAllTickets();
  }, []);

  const linkHandler = () => {
    dispatch(isLoading(true));
    try {
      const fetchingUser = async () => {
        const res = await UserAPI.getCurrentUser({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(res.data.data.data));
      };
      fetchingUser();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutHandler = async() => {

    try {
      const res = await UserAPI.changeRoles(
        { role: 'user' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.log(error)
    } finally {
    dispatch(clearUser(null));
    history.push("/");
    authService.logout();
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Ticketing System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* upper list */}
        <List>
          {["Profile", "Tickets"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Link to={text.toLowerCase()}>
                <ListItemButton
                  component="button"
                  onClick={linkHandler}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <AccountBoxIcon /> : <ListAltIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <br />
        <Divider />

        {/* lower List */}
        <Box>
          <Typography
            paragraph
            variant="caption"
            display="block"
            color="red"
            paddingX="12px"
            sx={{ opacity: open ? 1 : 0 }}
          >
            This is included for demo version only.
            <br />
            Only admin has access here.
          </Typography>
        </Box>
        <List>
          {["All-Tickets", "Monitoring"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Link to={text.toLowerCase()}>
                <ListItemButton
                  component="button"
                  onClick={linkHandler}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <FormatListBulletedIcon /> : <PlaylistAddCheckIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>

        <br />
        <Divider />
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={Button}
            onClick={logoutHandler}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
}
