import * as React from "react";
import List from "@mui/material/List";
import TodoListItem from "./TodoListItem";

export default function TodosList({ todoItems, actions }) {
  return (
    <List>
      {todoItems.map((todoItem) => {
        return (
          <TodoListItem
            todoItem={todoItem}
            actions={actions}
            key={todoItem.id}
          />
        );
      })}
    </List>
  );
}
