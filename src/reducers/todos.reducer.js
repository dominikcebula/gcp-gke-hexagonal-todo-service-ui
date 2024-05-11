import * as React from "react";

const initialState = [];

const actions = {
  TODO_ITEMS_RETRIEVED: "TODO_ITEMS_RETRIEVED",
  TODO_ITEM_ADDED: "TODO_ITEM_ADDED",
  TODO_ITEM_UPDATED: "TODO_ITEM_UPDATED",
  TODO_ITEM_REMOVED: "TODO_ITEM_REMOVED",
};

function todosReducer(state, action) {
  switch (action.id) {
    case actions.TODO_ITEMS_RETRIEVED:
      return todoItemsRetrieved(action);
    case actions.TODO_ITEM_ADDED:
      return todoItemAdded(state, action);
    case actions.TODO_ITEM_UPDATED:
      return todoItemUpdated(state, action);
    case actions.TODO_ITEM_REMOVED:
      return todoItemRemoved(state, action);
    default:
      return state;
  }
}

function todoItemsRetrieved(action) {
  return action.todoItemsData;
}

function todoItemAdded(state, action) {
  const newTodoItem = action.todoItem;

  return [...state, newTodoItem];
}

function todoItemUpdated(state, action) {
  return state.map((todoItem) => {
    if (todoItem.id === action.todoItem.id) {
      return action.todoItem;
    } else {
      return todoItem;
    }
  });
}

function todoItemRemoved(state, action) {
  return state.filter((item) => item.id !== action.todoItemId);
}

export function useTodosReducer() {
  const [state, dispatch] = React.useReducer(todosReducer, initialState);

  function handleTodoItemsRetrieved(todoItemsData) {
    dispatch({
      id: actions.TODO_ITEMS_RETRIEVED,
      todoItemsData: todoItemsData,
    });
  }

  function handleAddTodoItem(todoItem) {
    dispatch({
      id: actions.TODO_ITEM_ADDED,
      todoItem: todoItem,
    });
  }

  function handleUpdateTodoItem(todoItem) {
    dispatch({
      id: actions.TODO_ITEM_UPDATED,
      todoItem: todoItem,
    });
  }

  function handleRemoveTodoItem(todoItemId) {
    dispatch({
      id: actions.TODO_ITEM_REMOVED,
      todoItemId: todoItemId,
    });
  }

  return {
    todoItems: state,
    actions: {
      handleTodoItemsRetrieved,
      handleAddTodoItem,
      handleUpdateTodoItem,
      handleRemoveTodoItem,
    },
  };
}
