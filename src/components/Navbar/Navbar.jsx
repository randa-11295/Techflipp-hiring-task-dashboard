// components/Layout.js
"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
} from "@mui/material";
import { Home, Info, ContactPage } from "@mui/icons-material";
import Link from "next/link";

const drawerWidth = 240;

const Navbar = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link href="/">
              <ListItem button component="a">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link href="/about">
              <ListItem button component="a">
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </Link>
            <Link href="/contact">
              <ListItem button component="a">
                <ListItemIcon>
                  <ContactPage />
                </ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        {/* Top App Bar */}
     
        
            <Typography variant="h6" noWrap component="div" sx={{ p: 2 , borderBottom: 2, borderColor: "primary.main"}}>
              My Dashboard
            </Typography>
         
        
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;
