import Link from "next/link";
import {Toolbar,  Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Home, Info, ContactPage } from "@mui/icons-material";
const ContentNav = () => {
  return (
    <Box sx={{ overflow: "auto" }}>
      <Toolbar />
      <List>
        <Link href="/">
          <ListItem>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/cameras">
          <ListItem>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="cameras" />
          </ListItem>
        </Link>
        <Link href="/contact">
          <ListItem>
            <ListItemIcon>
              <ContactPage />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default ContentNav;
