import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import logo from "../../img/logo.png";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const sideBarRoutes = {
  Dashboard: "/dashboard",
  Ingredients: "/ingredients",
  Recipes: "/recipes/page/1",
  Account: "/account",
};

const sideBarIcons = {
  Dashboard: <DashboardIcon />,
  Recipes: <MenuBookIcon />,
  Ingredients: <KitchenIcon />,
  Account: <AccountCircleIcon />,
};

export default function Sidebar() {
  const navigate = useNavigate();
  const handleSideBarClick = (event) => {
    const path = event.target.innerText;
    navigate(sideBarRoutes[path]);
  };

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
            Easy Eats
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
          {["Dashboard", "Recipes", "Ingredients", "Account"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={(event) => {
                    handleSideBarClick(event);
                  }}
                >
                  <ListItemIcon>{sideBarIcons[text]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
        <Divider />
        <List>
          {["Settings", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
