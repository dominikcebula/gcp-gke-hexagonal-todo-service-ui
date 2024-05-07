import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <React.StrictMode>
      <CssBaseline />
      <TodoApp />
    </React.StrictMode>
  );
}

export default App;
