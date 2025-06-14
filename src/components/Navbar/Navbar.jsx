// components/Layout.js
"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Box,
  CssBaseline,
} from "@mui/material";
import ContentNav from "./ContentNav";

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
      
      <ContentNav />
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
