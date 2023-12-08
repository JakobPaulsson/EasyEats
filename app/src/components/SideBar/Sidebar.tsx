import * as React from "react";
import logo from "../../assets/logo.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KitchenIcon from "@mui/icons-material/Kitchen";
import PositionedSnackbar from "../../components/PositionedSnackbar/PositionedSnackbar";

import { AuthContext } from "../../contexts/AuthContext";
import TuneIcon from "@mui/icons-material/Tune";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;
const sideBarRoutes: Record<string, string> = {
  Dashboard: "/dashboard",
  Ingredients: "/ingredients",
  Recipes: "/recipes/page/1",
  Presets: "/presets",
  Logout: "/",
};

const sideBarIcons: Record<string, JSX.Element> = {
  Dashboard: <DashboardIcon />,
  Recipes: <MenuBookIcon />,
  Ingredients: <KitchenIcon />,
  Presets: <TuneIcon />,
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSideBarClick = (clicked: string) => {
    switch (clicked) {
      case "Logout":
        handleLogout();
        break;
      default:
        navigate(sideBarRoutes[clicked]);
        break;
    }
  };
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext broken in Sidebar.tsx");
  }

  const { logout } = authContext;

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      localStorage.setItem("userLoggedIn", JSON.stringify(false));
      navigate("/");
      setLoading(false);
    }, 500);
  };

  const [loading, setLoading] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <Typography
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            variant="h6"
            noWrap
            component="div"
          >
            {location.pathname.split("/")[1].charAt(0).toUpperCase() +
              location.pathname.split("/")[1].slice(1)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img src={logo} alt="logo" />
        <Divider />
        <List>
          {["Dashboard", "Recipes", "Ingredients", "Presets"].map((text) => (
            <ListItem data-cy={text} key={text} disablePadding>
              <ListItemButton
                onClick={(event: React.SyntheticEvent) => {
                  const clickedElement = event.target as HTMLElement;
                  handleSideBarClick(clickedElement.innerText);
                }}
              >
                <ListItemIcon>{sideBarIcons[text]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <PositionedSnackbar
          open={loading}
          vertical={"top"}
          horizontal={"center"}
          severity="info"
          message="Logging out..."
        />
        <List>
          <ListItem key={"Logout"} disablePadding>
            <ListItemButton
              onClick={(event: React.SyntheticEvent) => {
                const clickedElement = event.target as HTMLElement;
                handleSideBarClick(clickedElement.innerText);
              }}
            >
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
