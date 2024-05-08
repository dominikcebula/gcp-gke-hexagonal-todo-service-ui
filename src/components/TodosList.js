import * as React from "react";
import List from "@mui/material/List";
import TodoListItem from "./TodoListItem";
import { getTodos } from "../apis/TodoServiceAPI";

export default function TodosList({ todoItems, actions }) {
  React.useEffect(() => {
    getTodos((data) => {
      actions.handleTodoItemsRetrieved(data);
    });
  }, []);

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
