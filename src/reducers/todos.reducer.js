import * as React from "react";

const initialState = [];

const actions = {
  TODO_ITEMS_RETRIEVED: "TODO_ITEMS_RETRIEVED",
  TODO_ITEM_ADDED: "TODO_ITEM_ADDED",
  TODO_ITEM_REMOVED: "TODO_ITEM_REMOVED",
};

function todosReducer(state, action) {
  switch (action.id) {
    case actions.TODO_ITEMS_RETRIEVED:
      return todoItemsRetrieved(action);
    case actions.TODO_ITEM_ADDED:
      return todoItemAdded(state, action);
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
  const newTodoItem = createNewTodoItem(state, action);

  return [...state, newTodoItem];
}

function createNewTodoItem(state, action) {
  return {
    id: getNextTodoItemId(state),
    name: action.todoItemName,
    completed: false,
  };
}

function getNextTodoItemId(state) {
  const todoItemsIds = state.map((item) => item.id);

  return Math.max(...todoItemsIds) + 1;
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

  function handleAddTodoItem(todoItemName) {
    dispatch({
      id: actions.TODO_ITEM_ADDED,
      todoItemName: todoItemName,
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
      handleRemoveTodoItem,
    },
  };
}
