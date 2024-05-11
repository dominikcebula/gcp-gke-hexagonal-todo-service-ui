import React from "react";

import { updateTodoItemById } from "../apis/TodoServiceAPI";
import { deleteTodoItemById } from "../apis/TodoServiceAPI";
import TodoListItemText from "./TodoListItemText";
import TodoListItemEdit from "./TodoListItemEdit";

export default function TodoListItem({ todoItem, actions }) {
  const labelId = `todo-item-${todoItem.id}`;

  const [isEditable, setEditable] = React.useState(false);

  function handleEditTodoItemClicked() {
    setEditable(true);
  }

  function handleFinishEditingTodoItemClicked(newTodoItemName) {
    setEditable(false);

    const updatedTodoItem = {
      ...todoItem,
      name: newTodoItemName,
    };

    updateTodoItemById(todoItem.id, updatedTodoItem, onTodoItemUpdated);
  }

  function onTodoItemUpdated(todoItem) {
    actions.handleUpdateTodoItem(todoItem);
  }

  function toggleTodoItemCompletedState(todoItem) {
    const updatedTodoItem = {
      ...todoItem,
      completed: !todoItem.completed,
    };

    updateTodoItemById(todoItem.id, updatedTodoItem, onTodoItemUpdated);
  }

  function onTodoItemDeleted(todoItemId) {
    actions.handleRemoveTodoItem(todoItemId);
  }

  function handleDeleteTodoItemClicked(todoItemId) {
    deleteTodoItemById(todoItemId, onTodoItemDeleted);
  }

  if (!isEditable) {
    return (
      <TodoListItemText
        labelId={labelId}
        todoItem={todoItem}
        handleEditTodoItemClicked={handleEditTodoItemClicked}
        handleDeleteTodoItemClicked={handleDeleteTodoItemClicked}
        toggleTodoItemCompletedState={toggleTodoItemCompletedState}
      />
    );
  } else {
    return (
      <TodoListItemEdit
        labelId={labelId}
        todoItem={todoItem}
        handleFinishEditingTodoItemClicked={handleFinishEditingTodoItemClicked}
      />
    );
  }
}
