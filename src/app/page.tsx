"use client";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "./utilities/theme";
export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="contained">Contained</Button>
      </div>
    </ThemeProvider>
  );
}
