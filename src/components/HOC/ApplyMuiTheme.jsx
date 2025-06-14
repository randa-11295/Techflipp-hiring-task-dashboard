"use client";
import { ThemeProvider } from "@mui/material";
import theme from "../../utilities/theme";
import Navbar from "../Navbar/Navbar";
export default function ApplyMuiTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        {children}
        </Navbar>
    </ThemeProvider>
  );
}
