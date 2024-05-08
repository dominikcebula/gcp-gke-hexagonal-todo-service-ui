import * as React from "react";
import List from "@mui/material/List";
import TodoListItem from "./TodoListItem";

export default function TodosList({ todoItems }) {
  return (
    <List>
      {todoItems.map((todoItem) => {
        return <TodoListItem todoItem={todoItem} />;
      })}
    </List>
  );
}
