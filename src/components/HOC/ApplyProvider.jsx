"use client";
import { ThemeProvider } from "@mui/material";
import theme from "../../utilities/theme";
import Navbar from "../Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../utilities/react-query-client";
export default function ApplyProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Navbar>{children}</Navbar>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
