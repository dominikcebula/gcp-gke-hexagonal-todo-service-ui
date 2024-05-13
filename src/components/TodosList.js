import * as React from "react";
import List from "@mui/material/List";
import TodoListItem from "./TodoListItem";
import { getTodoItems } from "../apis/TodoServiceAPI";

export default function TodosList({ todoItems, actions }) {
  React.useEffect(() => {
    getTodoItems((data) => {
      actions.handleTodoItemsRetrieved(data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <List aria-label="tasks-list">
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
