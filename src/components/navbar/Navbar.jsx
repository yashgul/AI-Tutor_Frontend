import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";

const drawerWidth = 240;
const navItems = [
  { name: "About", url: "../about" },
  { name: "Products", url: "../products" },
  { name: "Cart", url: "../cart" },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userdata")) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      {/* <DarkModeToggle
        onChange={() => setIsDarkMode((prev) => !prev)}
        checked={isDarkMode}
        size={80}
      /> */}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item?.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink to={item?.url} style={{ textDecoration: "none" }}>
                <ListItemText primary={item?.name} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ boxShadow: "none", height: "11vh" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "flex" }, flexGrow: 1 }}>
            {navItems.map((item) => (
              <NavLink to={item?.url} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    ml: "30px",
                    color: "#ffffff",
                    position: "relative",
                  }}
                >
                  {item?.name}
                </Button>
              </NavLink>
            ))}

            {/* <NavLink to="../products" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  ml: "30px",
                  color: "#ffffff",
                  position: "relative",
                }}
              >
                Products
              </Button>
            </NavLink>
            <NavLink to="../cart" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  ml: "30px",
                  color: "#ffffff",
                  position: "relative",
                }}
              >
                Cart
              </Button>
            </NavLink> */}
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 0,
            }}
          >
            {!isLoggedIn && (
              <>
                <NavLink to="../login" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      ml: "5px",
                      color: "#fff",
                      position: "relative",
                      textTransform: "capitalize",
                    }}
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink to="../register" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      ml: "5px",

                      position: "relative",
                      textTransform: "capitalize",
                      color: "#ffffff",
                    }}
                  >
                    Register
                  </Button>
                </NavLink>
              </>
            )}

            {isLoggedIn && <AccountCircleIcon />}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        ></Typography>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar />
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
