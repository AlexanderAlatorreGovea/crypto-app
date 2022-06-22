import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import Login from "./components/Login/Login";
import { Routes } from "./routes/routes";

import "./index.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
