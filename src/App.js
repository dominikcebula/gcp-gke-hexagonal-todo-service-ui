import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TodoApp from "./components/TodoApp";
import { useTodosReducer } from "./reducers/todos.reducer";

function App() {
  const { todoItems, actions } = useTodosReducer();

  return (
    <React.StrictMode>
      <CssBaseline />
      <TodoApp todoItems={todoItems} actions={actions} />
    </React.StrictMode>
  );
}

export default App;
