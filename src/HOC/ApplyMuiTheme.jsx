"use client";
import { ThemeProvider } from "@mui/material";
import theme from "../utilities/theme";
export default function ApplyMuiTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  );
}
